export const paintEventsCategory = 'devtools.timeline';
export const paintName = 'Paint';
export const userTimingCategory = 'blink.user_timing';
export const firstLayoutName = 'firstLayout';
export const fullScreenWeight = 2;
export const pointsCalculateParameter1 = 2;
export const pointsCalculateParameter2 = 4;

export interface Event {
    time: number,
    x: number,
    y: number,
    width: number,
    height: number,
    frame: string,
    points: number,
    key: string
}

export interface Frame {
    time: number,
    progress: number
}

export interface PaintData {
    frame: string,
    clip: number[],
    nodeId: number,
    layerId: number
}

export interface TraceEvent {
    name: string,
    cat: string,
    ph: string,
    ts: number,
    pid: number,
    tid: number,
    dur: number,
    args: any | { data: PaintData }
}