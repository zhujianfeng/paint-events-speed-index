import {
    Event, 
    TraceEvent, 
    PaintData, 
    Frame,
    userTimingCategory,
    paintName,
    firstLayoutName,
    paintEventsCategory
} from './types';

type GroupType = Map<string, {points: number, events: Event[]}>;

export class EventFrame {
    private startTs: number;
    private events: Event[];
    private _groups: GroupType;
    private viewPortWidth: number;
    private viewPortHeight: number;

    constructor(startTs: number, traceEvents: TraceEvent[] | [], vpWidth: number, vpHeight: number) {
        this.startTs = startTs;
        this.viewPortWidth = vpWidth;
        this.viewPortHeight = vpHeight;
        this.events = this.filterEvents(traceEvents);
        this._groups = new Map<string, {points: number, events: Event[]}>();
    }

    get groups(): GroupType {
        return this._groups;
    }

    set groups(g: GroupType) {
        this._groups = g;
    }

    getPaintEventFrames(): Frame[] {
        this.groupEvents();
        this.decreaseFullScreenPoints();
        this.calculateEventPoints();

        const totalPoints = this.calculateTotalPoints();
        const paintEventFrames: Frame[] = [];

        let temp = 0;
        this.events.forEach(e => {
            temp += e.points;
            const frame = {
                time: e.time, 
                progress: 100 * temp / totalPoints
            };
            paintEventFrames.push(frame);
        });

        return paintEventFrames;
    }

    filterEvents(traceEvents: TraceEvent[]): Event[] {
        let firstLayoutTime = this.startTs * 1000;
        const firstLayout = traceEvents.filter(e => {
            return e.cat.includes(userTimingCategory) &&
                e.ts >= this.startTs * 1000 &&
                e.name === firstLayoutName;
        });
        if (firstLayout.length > 0) {
            firstLayoutTime = firstLayout[0].ts;
        }
    
        return traceEvents.filter(e => {
            return e.cat.includes(paintEventsCategory) &&
                e.ts >= this.startTs * 1000 &&
                e.ts >= firstLayoutTime &&
                e.name === paintName;
        }).map(e => this.formatEvent(e)).sort((a, b) => a.time - b.time);
    }

    formatEvent(event: TraceEvent): Event {
        const paintData: PaintData = event.args.data;
        const clip = paintData.clip;
        const {x, y, width, height} = this.calculateRect(clip[0], clip[1], clip[4], clip[5]);
        return {
            time: (event.ts + event.dur) / 1000,
            x,
            y,
            width,
            height,
            frame: paintData.frame,
            points: width * height,
            key: ''
        };
    }

    calculateRect(x1: number, y1: number, x2: number, y2: number)
        : {x: number, y: number, width: number, height: number} {
        x1 = x1 < 0 ? 0 : x1;
        x1 = x1 > this.viewPortWidth ? this.viewPortWidth : x1; 
        y1 = y1 < 0 ? 0 : y1;
        y1 = y1 > this.viewPortHeight ? this.viewPortHeight : y1;
    
        x2 = x2 < 0 ? 0 : x2;
        x2 = x2 > this.viewPortWidth ? this.viewPortWidth : x2; 
        y2 = y2 < 0 ? 0 : y2;
        y2 = y2 > this.viewPortHeight ? this.viewPortHeight : y2;
    
        return {
            x: Math.round(x1),
            y: Math.round(y1),
            width: x1 < x2 ? Math.round(x2 - x1) : 0,
            height: y1 < y2 ? Math.round(y2 - y1) : 0,
        };
    }

    genGroupKey(event: Event) : string {
        return event.frame + '-' +
            event.x + '-' +
            event.y + '-' +
            event.width + '-' +
            event.height;
    }

    groupEvents() {
        const paintEvents = this.events;
        paintEvents.forEach((e) => {
            const key = this.genGroupKey(e);
            e.key = key;
            let groupInfo = this.groups.get(key);
            if (groupInfo === undefined) {
                groupInfo = {
                    points: e.points,
                    events: [e]
                };
            } else {
                groupInfo.events.push(e);
            }
            this.groups.set(key, groupInfo);
        });
    }

    decreaseFullScreenPoints() {
        let maxPoints = 0;
        this.groups.forEach((groupInfo) => {
            if (maxPoints < groupInfo.points) {
                maxPoints = groupInfo.points;
            }
        });

        this.groups.forEach((groupInfo, key) => {
            if (maxPoints === groupInfo.points) {
                groupInfo.points /= 2;
            }
        });
    }

    calculateEventPoints() {
        this.groups.forEach((groupInfo) => {
            const eventPoints = groupInfo.points / groupInfo.events.length;
            groupInfo.events.forEach(e => {
                e.points = eventPoints;
            });
        });
    }

    calculateTotalPoints(): number {
        let totalPoints = 0;
        this.groups.forEach((groupInfo) => {
            totalPoints += groupInfo.points;
        });
        return totalPoints;
    }
}