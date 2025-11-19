/**
 * @module Packages/Logger
 * @description Logger class implementation
 */

import { isPrimitive } from "@stepflow/utils";

/**
 * @typedef {"DEBUG" | "INFO" | "WARN" | "ERROR"} LogLevel
 */

/**
 * Options of the logger
 *
 * @interface
 * @typedef {Object} LoggerOptions
 * @property {string} prefix
 * @property {LogLevel} initialLevel
 * @property {boolean} withTimestamp
 */

/** @type {LoggerOptions} */
const defaultOptions = {
	prefix: "",
	initialLevel: "ERROR",
	withTimestamp: false,
};

/** @type {Record<LogLevel, number>} */
const logLevelStat = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
};

/** @type {Record<LogLevel, string>} */
const logLevelToLogStyleMap = {
	DEBUG: "color: orange;",
	INFO: "color: blue;",
	WARN: "color: yellow;",
	ERROR: "color: red;",
};

/** @type {Record<LogLevel, (message?: any, ...optionalParams: any[]) => void>} */
const logLevelToLogFunction = {
	DEBUG: console.debug,
	INFO: console.info,
	WARN: console.warn,
	ERROR: console.error,
};

/**
 * Logger class for logging something
 */
export class Logger {
	/** @type {string} */
	#prefix;
	/** @type {LogLevel} */
	#level;
	/** @type {boolean} */
	#withTimestamp;

	/**
	 * @constructor
	 * @param {Partial<LoggerOptions>} [options=defaultOptions]
	 */
	constructor(options = defaultOptions) {
		/** @type {LoggerOptions} */
		const { prefix, initialLevel, withTimestamp } = { ...defaultOptions, ...options };

		this.#prefix = prefix;
		this.#level = initialLevel;
		this.#withTimestamp = withTimestamp;
	}

	/**
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 */
	debug(message, ...optionalParams) {
		this.#print("DEBUG", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 */
	info(message, ...optionalParams) {
		this.#print("INFO", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 */
	warn(message, ...optionalParams) {
		this.#print("WARN", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 */
	error(message, ...optionalParams) {
		this.#print("ERROR", message, optionalParams);
	}

	/**
	 * Main log function to print messages
	 *
	 * @param {LogLevel} logLevel
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 * @returns {void}
	 */
	#print(logLevel, message, ...optionalParams) {
		if (!this.#canPrint(logLevel)) return;
		const prefix = this.#createPrefix();
		const colorizedPrefixWithMessage = this.#colorizePrefixWithMessage(logLevel, prefix, message);
		logLevelToLogFunction[logLevel](...colorizedPrefixWithMessage, ...optionalParams);
	}

	/**
	 * Check if logger can print message related to log level
	 *
	 * @param {LogLevel} printLevel
	 * @returns {boolean}
	 */
	#canPrint(printLevel) {
		return logLevelStat[printLevel] >= logLevelStat[this.#level];
	}

	/**
	 * Create log prefix
	 *
	 * @returns {string}
	 */
	#createPrefix() {
		let prefix = `[${this.#prefix}]:`;
		if (this.#withTimestamp) {
			const datetime = new Date().toLocaleString().replace(/\//g, ".");
			prefix = `[${datetime}] ${prefix}`;
		}
		return prefix;
	}

	/**
	 * Colorize output message
	 *
	 * @param {LogLevel} logLevel
	 * @param {string} prefix
	 * @param {any} message
	 * @returns {any[]}
	 */
	#colorizePrefixWithMessage(logLevel, prefix, message) {
		return isPrimitive(message)
			? [`%c${prefix} ${message}%c`, logLevelToLogStyleMap[logLevel], ""]
			: [`%c${prefix}%c`, logLevelToLogStyleMap[logLevel], "", message];
	}
}
