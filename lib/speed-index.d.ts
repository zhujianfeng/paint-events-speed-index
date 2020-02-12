import { Frame } from './types';
export declare class SpeedIndex {
    start: number;
    end: number;
    width: number;
    height: number;
    private timelineFilePath;
    frames: Frame[];
    speedIndex: number;
    /**
     *
     * @param timeline timeline file path
     * @param width viewport width
     * @param height viewport height
     */
    constructor(timeline: string, width: number, height: number);
    private extractFrames;
    private calculateSpeedIndex;
}
//# sourceMappingURL=speed-index.d.ts.map