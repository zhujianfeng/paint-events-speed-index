"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintEventsSpeedIndex = void 0;
var speed_index_1 = require("./speed-index");
/**
 * get speed index from timeline
 * @param timeline path of the timeline file
 * @param width viewport width of the timeline
 * @param height viewport height of the timeline
 * @return speedIndex info
 */
function paintEventsSpeedIndex(timeline, width, height) {
    var _a = new speed_index_1.SpeedIndex(timeline, width, height), speedIndex = _a.speedIndex, start = _a.start, end = _a.end, frames = _a.frames;
    return {
        speedIndex: speedIndex,
        start: start,
        end: end,
        width: width,
        height: height,
        frames: frames
    };
}
exports.paintEventsSpeedIndex = paintEventsSpeedIndex;
