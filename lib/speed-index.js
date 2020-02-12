"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paint_events_1 = require("./paint-events");
var timeline_1 = require("./timeline");
var SpeedIndex = /** @class */ (function () {
    /**
     *
     * @param timeline timeline file path
     * @param width viewport width
     * @param height viewport height
     */
    function SpeedIndex(timeline, width, height) {
        this.start = 0;
        this.end = 0;
        this.width = 0;
        this.height = 0;
        this.speedIndex = 0;
        this.width = width;
        this.height = height;
        this.timelineFilePath = timeline;
        var _a = this.extractFrames(), start = _a.start, end = _a.end, frames = _a.frames;
        this.start = start;
        this.end = end;
        this.frames = frames;
        this.calculateSpeedIndex();
    }
    SpeedIndex.prototype.extractFrames = function () {
        var _a = timeline_1.extractEventsFromTimeline(this.timelineFilePath), start = _a.start, end = _a.end, events = _a.events;
        var eventFrames = new paint_events_1.EventFrame(start, events, this.width, this.height);
        var frames = eventFrames.getPaintEventFrames();
        return {
            start: start,
            end: end,
            frames: frames
        };
    };
    SpeedIndex.prototype.calculateSpeedIndex = function () {
        var lastTime = this.start;
        var speedIndex = 0;
        this.frames.forEach(function (frame) {
            speedIndex += (frame.time - lastTime) * (1 - frame.progress / 100);
            lastTime = frame.time;
        });
        this.speedIndex = speedIndex;
    };
    return SpeedIndex;
}());
exports.SpeedIndex = SpeedIndex;
