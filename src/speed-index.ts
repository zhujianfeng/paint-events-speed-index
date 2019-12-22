import {Frame} from './types';
import {EventFrame} from './paint-events';
import {extractEventsFromTimeline} from './timeline';

export class SpeedIndex {
    start: number = 0;
    end: number = 0;
    width: number = 0;
    height: number = 0;
    private timelineFilePath: string;
    frames: Frame[];
    speedIndex: number = 0;

    /**
     * 
     * @param timeline timeline file path
     * @param width viewport width
     * @param height viewport height
     */
    constructor(timeline: string, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.timelineFilePath = timeline;
        const {start, end, frames} = this.extractFrames();
        this.start = start;
        this.end = end;
        this.frames = frames;
        this.calculateSpeedIndex();
    }

    private extractFrames(): {start: number, end: number, frames: Frame[]} {
        const {start, end, events} = extractEventsFromTimeline(this.timelineFilePath);
        const eventFrames = new EventFrame(start, events, this.width, this.height);
        const frames = eventFrames.getPaintEventFrames();
        return {
            start,
            end,
            frames
        };
    }

    private calculateSpeedIndex() {
        let lastTime = this.start;
        let speedIndex = 0;
        this.frames.forEach(frame => {
            speedIndex += (frame.time - lastTime) * (1 - frame.progress / 100);
            lastTime = frame.time;
        });
        this.speedIndex = speedIndex;
    }
}