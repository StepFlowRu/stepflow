import { createLogger } from "@stepflow/logger";

const logger = createLogger({
	prefix: "",
	initialLevel: "TRACE",
	withTimestamp: true,
});

const testObj = { message: "World" };

logger.trace("Hello", testObj, "qwe");
logger.debug("Hello", testObj, "qwe");
logger.info("Hello", testObj, "qwe");
logger.warn("Hello", testObj, "qwe");
logger.error("Hello", testObj, "qwe");
