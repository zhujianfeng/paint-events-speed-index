"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var EventFrame = /** @class */ (function () {
    /**
     *
     * @param startTs start ts of trace events
     * @param traceEvents trace events from timeline
     * @param vpWidth viewport width
     * @param vpHeight viewport height
     */
    function EventFrame(startTs, traceEvents, vpWidth, vpHeight) {
        this.startTs = startTs;
        this.viewPortWidth = vpWidth;
        this.viewPortHeight = vpHeight;
        this.events = this.filterEvents(traceEvents);
        this._groups = new Map();
    }
    Object.defineProperty(EventFrame.prototype, "groups", {
        get: function () {
            return this._groups;
        },
        set: function (g) {
            this._groups = g;
        },
        enumerable: true,
        configurable: true
    });
    EventFrame.prototype.getPaintEventFrames = function () {
        this.groupEvents();
        //this.decreaseFullScreenPoints();
        this.calculateEventPoints();
        var totalPoints = this.calculateTotalPoints();
        var paintEventFrames = [];
        var temp = 0;
        this.events.forEach(function (e) {
            temp += e.points;
            var frame = {
                time: e.time,
                progress: 100 * temp / totalPoints
            };
            paintEventFrames.push(frame);
        });
        return paintEventFrames;
    };
    EventFrame.prototype.filterEvents = function (traceEvents) {
        var _this = this;
        var firstLayoutTime = this.startTs * 1000;
        var firstLayout = traceEvents.filter(function (e) {
            return e.cat.includes(types_1.userTimingCategory) &&
                e.ts >= _this.startTs * 1000 &&
                e.name === types_1.firstLayoutName;
        });
        if (firstLayout.length > 0) {
            firstLayoutTime = firstLayout[0].ts;
        }
        return traceEvents.filter(function (e) {
            return e.cat.includes(types_1.paintEventsCategory) &&
                e.ts >= _this.startTs * 1000 &&
                e.ts >= firstLayoutTime &&
                e.ph === 'X' &&
                e.name === types_1.paintName;
        }).map(function (e) { return _this.formatEvent(e); }).sort(function (a, b) { return a.time - b.time; });
    };
    EventFrame.prototype.formatEvent = function (event) {
        var paintData = event.args.data;
        var clip = paintData.clip;
        var _a = this.calculateRect(clip[0], clip[1], clip[4], clip[5]), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return {
            time: (event.ts + event.dur) / 1000,
            x: x,
            y: y,
            width: width,
            height: height,
            frame: paintData.frame,
            points: 0,
            key: ''
        };
    };
    EventFrame.prototype.calculateRect = function (x1, y1, x2, y2) {
        return {
            x: Math.round(x1),
            y: Math.round(y1),
            width: x1 < x2 ? Math.round(x2 - x1) : 0,
            height: y1 < y2 ? Math.round(y2 - y1) : 0,
        };
    };
    EventFrame.prototype.genGroupKey = function (event) {
        return event.frame + '-' +
            event.x + '-' +
            event.y + '-' +
            event.width + '-' +
            event.height;
    };
    EventFrame.prototype.groupEvents = function () {
        var _this = this;
        var paintEvents = this.events;
        paintEvents.forEach(function (e) {
            var key = _this.genGroupKey(e);
            e.key = key;
            var groupInfo = _this.groups.get(key);
            if (groupInfo === undefined) {
                groupInfo = {
                    points: _this.calculateGroupPoints(e.x, e.y, e.width, e.height),
                    events: [e]
                };
            }
            else {
                groupInfo.events.push(e);
            }
            _this.groups.set(key, groupInfo);
        });
    };
    EventFrame.prototype.calculateAreas = function (x, y, width, height) {
        var firstScreenWidth = width;
        var firstScreenHeight = height;
        var widthDiff = x + width - this.viewPortWidth;
        if (widthDiff > 0) {
            firstScreenWidth = firstScreenWidth - widthDiff;
        }
        if (x < 0) {
            firstScreenWidth = firstScreenWidth + x;
        }
        var heightDiff = y + height - this.viewPortHeight;
        if (heightDiff > 0) {
            firstScreenHeight = firstScreenHeight - heightDiff;
        }
        if (y < 0) {
            firstScreenHeight = firstScreenHeight + y;
        }
        var inFirstScreenArea = firstScreenWidth * firstScreenHeight;
        if (inFirstScreenArea < 0) {
            inFirstScreenArea = 0;
        }
        var outOfFirstScreenArea = width * height - inFirstScreenArea;
        return {
            inFirstScreenArea: inFirstScreenArea,
            outOfFirstScreenArea: outOfFirstScreenArea
        };
    };
    EventFrame.prototype.calculateGroupPoints = function (x, y, width, height) {
        if (x === 0 && y === 0 && width === this.viewPortWidth && height === this.viewPortHeight) {
            return width * height / types_1.fullScreenWeight;
        }
        if (x >= 0 && y >= 0 && x + width <= this.viewPortWidth && y + height <= this.viewPortHeight) {
            return width * height;
        }
        if (x >= this.viewPortWidth || y >= this.viewPortHeight || x + width <= 0 || y + height <= 0) {
            return 0;
        }
        var _a = this.calculateAreas(x, y, width, height), inFirstScreenArea = _a.inFirstScreenArea, outOfFirstScreenArea = _a.outOfFirstScreenArea;
        if (inFirstScreenArea <= 0) {
            return 0;
        }
        var ratio = outOfFirstScreenArea / inFirstScreenArea;
        // 1/(2*e^(2*x))
        var points = inFirstScreenArea / (types_1.pointsCalculateParameter1 * Math.pow(Math.E, types_1.pointsCalculateParameter2 * ratio));
        return points;
    };
    EventFrame.prototype.calculateEventPoints = function () {
        this.groups.forEach(function (groupInfo) {
            var eventPoints = groupInfo.points / groupInfo.events.length;
            groupInfo.events.forEach(function (e) {
                e.points = eventPoints;
            });
        });
    };
    EventFrame.prototype.calculateTotalPoints = function () {
        var totalPoints = 0;
        this.groups.forEach(function (groupInfo) {
            totalPoints += groupInfo.points;
        });
        return totalPoints;
    };
    return EventFrame;
}());
exports.EventFrame = EventFrame;
