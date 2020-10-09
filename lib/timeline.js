"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractEventsFromTimeline = void 0;
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
