import { createLogger } from "@stepflow/logger";

const logger = createLogger({
	prefix: "",
	initialLevel: "DEBUG",
	withTimestamp: true,
});

const testObj = { message: "World" };

logger.debug("Hello", testObj, "qwe");
logger.info("Hello", testObj, "qwe");
logger.warn("Hello", testObj, "qwe");
logger.error("Hello", testObj, "qwe");
