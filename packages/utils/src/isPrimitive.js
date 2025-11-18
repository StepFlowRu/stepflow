/**
 * Check if value is primitive
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isPrimitive(value) {
	return !isNotPrimitive(value);
}

/**
 * Check if value is not primitive
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isNotPrimitive(value) {
	return ["object", "function"].includes(typeof value);
}
