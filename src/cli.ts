#!/usr/bin/env node
import {paintEventsSpeedIndex} from "./index";
import meow from "meow";

const cli = meow(`
	Usage
	    $ pespeedindex <timeline_file> <width> <height>

	Examples
	    $ pespeedindex ./timeline.json 1920 1080
`, {});

if (cli.input.length !== 3) {
    cli.showHelp();
}

const timeline = cli.input[0];
const width = parseInt(cli.input[1]);
const height = parseInt(cli.input[2]);
const speedindexInfo = paintEventsSpeedIndex(timeline, width, height);

console.log(`Speed Index: ${speedindexInfo.speedIndex.toFixed(1)}`);