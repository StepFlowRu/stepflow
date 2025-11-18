/** @import { LoggerOptions } from './logger.js' */
import { Logger } from "./logger.js";

/**
 * Create logger for logging node/browser messages
 *
 * @param {LoggerOptions} [options]
 * @returns {Logger}
 */
export function createLogger(options) {
	return new Logger(options);
}
