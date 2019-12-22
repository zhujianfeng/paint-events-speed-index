import {SpeedIndex} from './speed-index';
import {Frame} from './types';

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