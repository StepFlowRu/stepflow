#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import url from "node:url";

const processPath = process.cwd();
const configFilePath = path.resolve(processPath, "./builder.config.js");

/**
 * Start function
 */
async function start() {
	const configFile = (await import(url.pathToFileURL(configFilePath).href)).default;
	console.log("Calling builder with config:", configFile);
}

start();
