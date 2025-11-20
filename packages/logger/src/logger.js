/**
 * @module Packages/Logger
 * @description Logger class implementation
 */

import { isPrimitive } from "@stepflow/utils";

import { ansiColors } from "./colors.js";

/**
 * @typedef {"TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR"} LogLevel
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
	TRACE: -1,
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
};

/** @type {Record<LogLevel, string>} */
const logLevelToString = {
	TRACE: "Trace",
	DEBUG: "Debug",
	INFO: "Info ",
	WARN: "Warn ",
	ERROR: "Error",
};

/** @type {Record<LogLevel, string>} */
const logLevelToColor = {
	TRACE: "",
	DEBUG: ansiColors.cyan,
	INFO: ansiColors.blue,
	WARN: ansiColors.yellow,
	ERROR: ansiColors.red,
};

/** @type {Record<LogLevel, (message?: any, ...optionalParams: any[]) => void>} */
const logLevelToLogFunction = {
	TRACE: console.log,
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
	#logLevel;
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
		this.#logLevel = initialLevel;
		this.#withTimestamp = withTimestamp;
	}

	/**
	 * @param {any} message
	 * @param {...any} optionalParams
	 */
	trace(message, ...optionalParams) {
		this.#print("TRACE", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any} optionalParams
	 */
	debug(message, ...optionalParams) {
		this.#print("DEBUG", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any} optionalParams
	 */
	info(message, ...optionalParams) {
		this.#print("INFO", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any} optionalParams
	 */
	warn(message, ...optionalParams) {
		this.#print("WARN", message, optionalParams);
	}

	/**
	 * @param {any} message
	 * @param {...any} optionalParams
	 */
	error(message, ...optionalParams) {
		this.#print("ERROR", message, optionalParams);
	}

	/**
	 * Set log level
	 *
	 * @param {LogLevel} logLevel
	 */
	setLevel(logLevel) {
		this.#logLevel = logLevel;
	}

	/**
	 * Main log function to print messages
	 *
	 * @param {LogLevel} logLevel
	 * @param {any} message
	 * @param {any[]} optionalParams
	 * @returns {void}
	 */
	#print(logLevel, message, optionalParams) {
		if (!this.#canPrint(logLevel)) return;
		const prefix = this.#createPrefix(logLevel);
		const colorizedPrefixWithMessage = this.#colorizePrefixWithMessage(logLevel, prefix, message);
		logLevelToLogFunction[logLevel](...colorizedPrefixWithMessage, ...optionalParams);
	}

	/**
	 * Check if logger can print message related to log level
	 *
	 * @param {LogLevel} logLevel
	 * @returns {boolean}
	 */
	#canPrint(logLevel) {
		return logLevelStat[logLevel] >= logLevelStat[this.#logLevel];
	}

	/**
	 * Create log prefix
	 *
	 * @param {LogLevel} logLevel
	 * @returns {string}
	 */
	#createPrefix(logLevel) {
		let prefix = `(${logLevelToString[logLevel]})`;

		if (this.#prefix.length) {
			prefix += ` [${this.#prefix}]`;
		}
		if (this.#withTimestamp) {
			const date = new Date();
			prefix = `[${date.toISOString()}] ${prefix}`;
		}
		prefix += ":";

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
			? [`${logLevelToColor[logLevel]}${prefix}${prefix.length ? " " : ""}${message}${ansiColors.reset}`]
			: [`${logLevelToColor[logLevel]}${prefix}${ansiColors.reset}`, message];
	}
}
