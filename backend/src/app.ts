import express, { Express } from 'express';
import config from 'config';
import DB from './db';
import { getControllers } from './utils/controllers';
import logger from './utils/logger';
class App{
    public app: Express;
    public port: number;
    constructor() {
        logger.debug("Starting server...");
        this.app = express();
        this.port = config.get<number>('server').port;
        this.app.use(express.json());
        this.setRoutes();
        this.connectDB();
        this.app.listen(this.port, () => {
            logger.info(`Server running on port ${this.port}`);
        });
    }
    async setRoutes() {
        const controllers = await getControllers();
        for (const controller of controllers) this.app.use(controller);
    }
    async connectDB() {
        await DB();
    }
}

export default App;