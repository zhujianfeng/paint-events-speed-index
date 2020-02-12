#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var meow_1 = __importDefault(require("meow"));
var cli = meow_1.default("\n\tUsage\n\t    $ pespeedindex <timeline_file> <width> <height>\n\n\tExamples\n\t    $ pespeedindex ./timeline.json 1920 1080\n", {});
if (cli.input.length !== 3) {
    cli.showHelp();
}
var timeline = cli.input[0];
var width = parseInt(cli.input[1]);
var height = parseInt(cli.input[2]);
var speedindexInfo = index_1.paintEventsSpeedIndex(timeline, width, height);
console.log("Speed Index: " + speedindexInfo.speedIndex.toFixed(1));
