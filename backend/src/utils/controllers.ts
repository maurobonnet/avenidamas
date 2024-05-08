import fs from "fs/promises";
import {Router} from "express";
import logger from "./logger";
export const getControllers = async () => {
    try {
        logger.debug("getControllers => GETTING");
        const files: string[] = await fs.readdir("./src/controllers");
        let controllers: Router[] = [];
        for (const file of files) {
            const controller = await import(`../controllers/${file}`);
            controllers.push(controller.default);
        }
        return controllers;
    } catch (error) {
        logger.error("getControllers => ERROR => ", error);
    }
}