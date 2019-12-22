import {extractEventsFromTimeline} from '../src/timeline';
import * as path from 'path';

test('can extract events from timeline', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const res = extractEventsFromTimeline(timeline);
    expect(res.start).toBeGreaterThan(0);
    expect(res.end).toBeGreaterThanOrEqual(res.start);
    expect(res.events.length).toBeGreaterThan(0);
});