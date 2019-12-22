import { Event, TraceEvent, Frame } from './types';
declare type GroupType = Map<string, {
    points: number;
    events: Event[];
}>;
export declare class EventFrame {
    private startTs;
    private events;
    private _groups;
    private viewPortWidth;
    private viewPortHeight;
    constructor(startTs: number, traceEvents: TraceEvent[] | [], vpWidth: number, vpHeight: number);
    get groups(): GroupType;
    set groups(g: GroupType);
    getPaintEventFrames(): Frame[];
    filterEvents(traceEvents: TraceEvent[]): Event[];
    formatEvent(event: TraceEvent): Event;
    calculateRect(x1: number, y1: number, x2: number, y2: number): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    genGroupKey(event: Event): string;
    groupEvents(): void;
    decreaseFullScreenPoints(): void;
    calculateEventPoints(): void;
    calculateTotalPoints(): number;
}
export {};
//# sourceMappingURL=paint-events.d.ts.map