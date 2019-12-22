import {Event} from '../src/types'
import {EventFrame} from '../src/paint-events';
import {extractEventsFromTimeline} from '../src/timeline';
import * as path from 'path';

test('genGroupKey returns the right value', () => {
    const event: Event = {
        time: 0,
        x: 0,
        y: 0,
        width: 10,
        height: 20,
        frame: 'frameid',
        points: 0,
        key: ''
    };

    const eventFrame = new EventFrame(0, [], 0, 0);

    expect(eventFrame.genGroupKey(event)).toBe('frameid-0-0-10-20');
});

test('calculateRect returns the right value', () => {
    const eventFrame = new EventFrame(0, [], 800, 600);
    const testData = [
        [[-100, 0, -20, 10], [0, 0, 0, 10]],
        [[0, 0, 20, 10], [0, 0, 20, 10]],
        [[0, 0, 900, 700], [0, 0, 800, 600]],
    ];
    for (const [[x1, y1, x2, y2], [x, y, width, height]] of testData) {
        const res = eventFrame.calculateRect(x1, y1, x2, y2);
        expect(res.x).toBe(x);
        expect(res.y).toBe(y);
        expect(res.width).toBe(width);
        expect(res.height).toBe(height);
    }
});

test('formatEvent returns the right value', () => {
    const eventFrame = new EventFrame(0, [], 1920, 1080);
    const traceEvent = {
        pid: 69526,
        tid: 775,
        ts: 73901769264,
        ph: "X",
        cat: "devtools.timeline,rail",
        name: "Paint",
        dur: 13,
        tdur: 13,
        tts: 252256,
        args: {
            data: {
                frame: "90A8E48227BFF20C36BF49CD36F64120",
                clip: [0.0,0.0,1920.0,0.0,1920.0,1080.0,0.0,1080.0],
                nodeId: 3,
                layerId: 11
            }
        }
    };
    const event = eventFrame.formatEvent(traceEvent);
    expect(event.frame).toBe(traceEvent.args.data.frame);
    expect(event.time).toBe((traceEvent.ts + traceEvent.dur) / 1000);
    expect(event.x).toBe(0);
    expect(event.y).toBe(0);
    expect(event.width).toBe(1920);
    expect(event.height).toBe(1080);
});

test('filterEvents returns the right value', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const {start, events} = extractEventsFromTimeline(timeline);

    const eventFrame = new EventFrame(start, events, 1920, 1080);
    const filteredEvents = eventFrame.filterEvents(events);

    expect(filteredEvents.length).toBeGreaterThan(1);
    expect(filteredEvents.length).toBeLessThan(events.length);
    expect(filteredEvents[0].time).toBeGreaterThanOrEqual(start);
    expect(filteredEvents[0].time).toBeLessThan(filteredEvents[1].time); 
});

test('events has been grouped correctly', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const {start, events} = extractEventsFromTimeline(timeline);

    const eventFrame = new EventFrame(start, events, 1920, 1080);
    eventFrame.groupEvents();
    const groups = eventFrame.groups;
    expect(groups.size).toBeGreaterThan(0);
    
    groups.forEach(e => {
        expect(e.events.length).toBeGreaterThan(0);
    });
});

test('decrease full screen points correctly', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const {start, events} = extractEventsFromTimeline(timeline);

    const eventFrame = new EventFrame(start, events, 1920, 1080);
    eventFrame.groupEvents();
    eventFrame.decreaseFullScreenPoints();
    const groups = eventFrame.groups;
    
    let max = 0;
    groups.forEach(e => {
        max = max < e.points ? e.points : max;
        
    });

    expect(max).toBe(1920 * 1080 / 2);
});

test('calculate event points correctly', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const {start, events} = extractEventsFromTimeline(timeline);

    const eventFrame = new EventFrame(start, events, 1920, 1080);
    eventFrame.groupEvents();
    eventFrame.decreaseFullScreenPoints();
    eventFrame.calculateEventPoints();
    const groups = eventFrame.groups;
    
    groups.forEach(g => {
        const eventPoints = g.points / g.events.length;
        g.events.forEach(e => {
            expect(e.points).toBe(eventPoints);
        });
    });
});



test('getPaintEventFrames returns the right value', () => {
    const timeline = path.join(__dirname, 'assets/coderjoy-timeline.json');
    const {start, events} = extractEventsFromTimeline(timeline);

    const eventFrame = new EventFrame(start, events, 1920, 1080);
    const frames = eventFrame.getPaintEventFrames();
    
    expect(frames.length).toBeGreaterThan(0);

    frames.forEach((frame, i) => {
        expect(frame.time).toBeGreaterThanOrEqual(start);
        expect(frame.progress).toBeGreaterThanOrEqual(0);
        expect(frame.progress).toBeLessThanOrEqual(100);
        if (i > 0) {
            expect(frame.time).toBeGreaterThanOrEqual(frames[i-1].time);
            expect(frame.progress).toBeGreaterThanOrEqual(frames[i-1].progress);
        }
    });
});