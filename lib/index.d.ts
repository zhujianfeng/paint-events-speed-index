import { Frame } from './types';
/**
 * get speed index from timeline
 * @param timeline path of the timeline file
 * @param width viewport width of the timeline
 * @param height viewport height of the timeline
 * @return speedIndex info
 */
export declare function paintEventsSpeedIndex(timeline: string, width: number, height: number): {
    speedIndex: number;
    start: number;
    end: number;
    width: number;
    height: number;
    frames: Frame[];
};
//# sourceMappingURL=index.d.ts.map