import { Frame } from './types';
export declare class SpeedIndex {
    start: number;
    end: number;
    width: number;
    height: number;
    private timelineFilePath;
    frames: Frame[];
    speedIndex: number;
    constructor(timeline: string, width: number, height: number);
    private extractFrames;
    private calculateSpeedIndex;
}
//# sourceMappingURL=speed-index.d.ts.map