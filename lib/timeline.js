"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function extractEventsFromTimeline(timeline) {
    var timelineFile = fs.readFileSync(timeline, 'utf-8');
    var trace;
    try {
        trace = JSON.parse(timelineFile);
    }
    catch (e) {
        throw new Error('Invalid JSON' + e.message);
    }
    var events = trace.traceEvents || trace;
    var start = Number.MAX_VALUE;
    var end = -Number.MAX_VALUE;
    events.forEach(function (e) {
        if (e.ts === 0) {
            return;
        }
        start = Math.min(start, e.ts);
        end = Math.max(end, e.ts);
    });
    start /= 1000;
    end /= 1000;
    return {
        start: start,
        end: end,
        events: events
    };
}
exports.extractEventsFromTimeline = extractEventsFromTimeline;
