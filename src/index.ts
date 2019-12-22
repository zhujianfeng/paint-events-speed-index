import {SpeedIndex} from './speed-index';
import {Frame} from './types';

/**
 * get speed index from timeline
 * @param timeline path of the timeline file
 * @param width viewport width of the timeline
 * @param height viewport height of the timeline
 * @return speedIndex info
 */
export function paintEventsSpeedIndex(timeline: string, width: number, height: number)
    : {
        speedIndex: number, 
        start: number, 
        end: number, 
        width: number, 
        height: number, 
        frames: Frame[]
    } {
    const {speedIndex, start, end, frames} = new SpeedIndex(timeline, width, height);
    return {
        speedIndex,
        start,
        end,
        width,
        height,
        frames
    };
}