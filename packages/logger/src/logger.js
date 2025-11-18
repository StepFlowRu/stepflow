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
 */

/** @type {LoggerOptions} */
const defaultOptions = {
	prefix: "",
	initialLevel: "ERROR",
};

/** @type {Record<LogLevel, number>} */
const logLevelStat = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
};

/**
 * Logger class for logging something
 */
export class Logger {
	/** @type {string} */
	#prefix;
	/** @type {LogLevel} */
	#level;

	/**
	 * @constructor
	 * @param {Partial<LoggerOptions>} [options=defaultOptions]
	 */
	constructor(options = defaultOptions) {
		/** @type {LoggerOptions} */
		const { prefix, initialLevel } = { ...defaultOptions, ...options };

		this.#prefix = prefix;
		this.#level = initialLevel;
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
	 * @param {LogLevel} level
	 * @param {any} message
	 * @param {...any[]} optionalParams
	 */
	#print(level, message, ...optionalParams) {
		if (!this.#canPrint(level)) return;
		const prefix = `[${this.#prefix}]:`;
		const formattedMessage = isPrimitive(message) ? [`${prefix} ${message}`] : [prefix, message];

		switch (level) {
			case "DEBUG":
				console.debug(...formattedMessage, optionalParams);
				break;
			case "INFO":
				console.info(...formattedMessage, optionalParams);
				break;
			case "WARN":
				console.warn(...formattedMessage, optionalParams);
				break;
			case "ERROR":
				console.error(...formattedMessage, optionalParams);
				break;
			default:
				throw new Error(`Unknown log leve: ${level}`);
		}
	}

	/**
	 * Check if logger can print message related to log level
	 *
	 * @param {LogLevel} printLevel
	 */
	#canPrint(printLevel) {
		return logLevelStat[printLevel] >= logLevelStat[this.#level];
	}
}
