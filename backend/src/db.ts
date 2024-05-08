import mongoose from "mongoose";
import config from "config";
import logger from "./utils/logger";
const DB = async (): Promise<void> => {
    try {
        logger.debug("Connecting to database...");
        const url: string = config.get<string>("db").url;
        await mongoose.connect(url);
        logger.info("Connected to database");
    } catch (error) {
        logger.error("Could not connect to database", error);
    }
}

export default DB;