/**
 * Convert color number to log format
 * @param {number} color
 */
function toLogColorFormat(color) {
	return `\x1b[${color}m`;
}

export const ansiColors = {
	black: toLogColorFormat(30),
	red: toLogColorFormat(31),
	green: toLogColorFormat(32),
	yellow: toLogColorFormat(33),
	blue: toLogColorFormat(34),
	magenta: toLogColorFormat(35),
	cyan: toLogColorFormat(36),
	white: toLogColorFormat(37),
	reset: toLogColorFormat(0),
};
