import {SpeedIndex} from '../src/speed-index';
import * as path from 'path';

test('calculate speed index', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const speedIndex = new SpeedIndex(timeline, 1920, 1080);

    expect(speedIndex.start).toBeGreaterThan(0);
    expect(speedIndex.end).toBeGreaterThan(0);
    expect(speedIndex.width).toBe(1920);
    expect(speedIndex.height).toBe(1080);
    expect(speedIndex.frames.length).toBeGreaterThan(0);
    expect(speedIndex.speedIndex).toBeGreaterThan(0);
    expect(speedIndex.speedIndex).toBeLessThanOrEqual(speedIndex.end - speedIndex.start);
});