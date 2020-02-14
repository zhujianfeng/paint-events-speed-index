import {
    Event, 
    TraceEvent, 
    PaintData, 
    Frame,
    userTimingCategory,
    paintName,
    firstLayoutName,
    paintEventsCategory,
    fullScreenWeight,
    pointsCalculateParameter1,
    pointsCalculateParameter2
} from './types';

type GroupType = Map<string, {points: number, events: Event[]}>;

export class EventFrame {
    private startTs: number;
    private events: Event[];
    private _groups: GroupType;
    private viewPortWidth: number;
    private viewPortHeight: number;

    /**
     * 
     * @param startTs start ts of trace events
     * @param traceEvents trace events from timeline
     * @param vpWidth viewport width
     * @param vpHeight viewport height
     */
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
        //this.decreaseFullScreenPoints();
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
        //console.log(this.events);
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
                e.ph === 'X' &&
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
            points: 0,
            key: ''
        };
    }

    calculateRect(x1: number, y1: number, x2: number, y2: number)
        : {x: number, y: number, width: number, height: number} {
    
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
                    points: this.calculateGroupPoints(e.x, e.y, e.width, e.height),
                    events: [e]
                };
            } else {
                groupInfo.events.push(e);
            }
            this.groups.set(key, groupInfo);
        });
    }

    calculateAreas(x: number, y: number, width: number, height: number) : {inFirstScreenArea: number, outOfFirstScreenArea: number} {
        let firstScreenWidth = width;
        let firstScreenHeight = height;
        
        const widthDiff = x + width - this.viewPortWidth;
        if (widthDiff > 0) {
            firstScreenWidth = firstScreenWidth - widthDiff;
        }
        if (x < 0) {
            firstScreenWidth = firstScreenWidth + x;
        }

        const heightDiff = y + height - this.viewPortHeight;
        if (heightDiff > 0) {
            firstScreenHeight = firstScreenHeight - heightDiff;
        }
        if (y < 0) {
            firstScreenHeight = firstScreenHeight + y;
        }

        let inFirstScreenArea = firstScreenWidth * firstScreenHeight;
        if (inFirstScreenArea < 0) {
            inFirstScreenArea = 0;
        }
        const outOfFirstScreenArea = width * height - inFirstScreenArea;
        return {
            inFirstScreenArea,
            outOfFirstScreenArea
        };
    }

    calculateGroupPoints(x: number, y: number, width: number, height: number) : number {
        if (x === 0 && y === 0 && width === this.viewPortWidth && height === this.viewPortHeight) {
            return width * height / fullScreenWeight;
        }
        if (x >=0 && y >= 0 && x + width <= this.viewPortWidth && y + height <= this.viewPortHeight) {
            return width * height;
        }

        if (x >= this.viewPortWidth || y >= this.viewPortHeight || x + width <= 0 || y + height <= 0) {
            return 0;
        }

        const {inFirstScreenArea, outOfFirstScreenArea} = this.calculateAreas(x, y, width, height);
        if (inFirstScreenArea <= 0) {
            return 0;
        }
        
        const ratio = outOfFirstScreenArea / inFirstScreenArea;
        let points = inFirstScreenArea;
        if (width > this.viewPortWidth || height > this.viewPortHeight) {
            // 1/(2*e^(2*x))
            points = inFirstScreenArea / (pointsCalculateParameter1 * Math.pow(Math.E, pointsCalculateParameter2 * ratio));
        }
        return points;
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