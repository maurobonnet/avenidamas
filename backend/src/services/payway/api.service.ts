import logger from "../../utils/logger";
import axios from "axios";
import config from "config";
import { v4 as uuidv4 } from "uuid";
import { iResponseWithToken, iRequestGetToken, iRequestSendPayment, iPayment } from "../../@types/Payments";
export class PaywayService{
    constructor() {
    }

    async getToken(param: iRequestGetToken): Promise<iResponseWithToken> {
        try {
            logger.debug(`PaywayService => GETTING TOKEN`);
            const headers = {
                "Content-Type": "application/json",
                "apiKey": config.get<string>("integrations").payway.credentials.apiKeyToken
            };
            const url = `${config.get("integrations").payway.server.url}/${config.get("integrations").payway.credentials.path}`
            const result = await axios.post(url,
            param,
            {headers});
            if(!result) new Error("Error getting token");
            logger.info(`PaywayService => TOKEN => ${JSON.stringify(result.data)}`);
            return result.data;
        } catch (error) {
            logger.error(`PaywayService => getToken => ERROR => ${JSON.stringify(error)}`);
        }
    }
    randomNumbers(){
        return `${Math.floor(100000 + Math.random() * 900000)}`;
    }
    async sendPayment(param: iRequestSendPayment): Promise<iPayment> {
        try {
            logger.debug(`PaywayService => SENDING PAYMENT`);
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "apiKey": config.get<string>("integrations").payway.credentials.apiKeyPayments
            };
            const result = await axios.post(`${config.get("integrations").payway.server.url}/${config.get("integrations").payway.pathPayment}`,
            param,
            {headers});
            logger.info(`PaywayService => PAYMENT => ${JSON.stringify(result.data)}`);
            return result.data;
        } catch (error) {
            logger.error(`PaywayService => sendPayment => ERROR => ${JSON.stringify(error)}`);
        }
    }
}