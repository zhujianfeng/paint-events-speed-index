import * as fs from 'fs';
import {TraceEvent} from './types';

export function extractEventsFromTimeline(timeline: string): {start: number, end: number, events: TraceEvent[]} {
    const timelineFile = fs.readFileSync(timeline, 'utf-8');

    let trace;
    try {
        trace = JSON.parse(timelineFile);
    } catch(e) {
        throw new Error('Invalid JSON' + e.message);
    }

    let events = trace.traceEvents || trace;

    let start = Number.MAX_VALUE;
	let end = -Number.MAX_VALUE;
	events.forEach((e: TraceEvent) => {
		if (e.ts === 0) {
			return;
		}
		start = Math.min(start, e.ts);
		end = Math.max(end, e.ts);
	});

	start /= 1000;
	end /= 1000;

	return {
		start,
        end,
        events
	};
}