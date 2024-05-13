import { iPayment, iRequestGetToken, iRequestSendPayment, iResponseWithToken } from "../@types/Payments";
import {Payments} from "../models/Payments";
import { Response, Request } from "express";
import config from "config";
import logger from "../utils/logger";
import { PaywayService } from "./payway/api.service";
import { v4 as uuidv4 } from "uuid";
export class PaymentsService {
    async add(req: Request, res: Response): Promise<void> {
        try {
            const dataCard: any = req.body;
            const [month, year] = dataCard.expiry.split("/");
            logger.info(`PaymentsService => ADDING => ${JSON.stringify(dataCard)}`);
            const payway = new PaywayService();
            const requestToken: iRequestGetToken = {
                "card_number": dataCard.number,
                "card_expiration_month": month,
                "card_expiration_year": year,
                "security_code": dataCard.cvc,
                "card_holder_name": "mauro bonnet",
                "card_holder_birthday": "01091994",
                "card_holder_door_number": 1502,
                "card_holder_identification": {
                  "type": "string",
                  "number": dataCard.dni
                }
              };
            const token = await payway.getToken(requestToken);
            const requestPayment: iRequestSendPayment = {
                site_transaction_id: Math.random().toString(36).slice(2),
                token: token.id,
                payment_method_id: 1,
                bin: token.bin,
                amount: dataCard.amount,
                currency: "ARS",
                installments: 1,
                payment_type: "single",
                sub_payments: []
            };
            const sendPayment = await payway.sendPayment(requestPayment);
            if(!sendPayment) new Error("Error sending payment");
            const newPayment = new Payments(sendPayment);
            const result = await newPayment.save();
            if(!result) new Error("Error adding payment");
            logger.info(`PaymentsService => ADDED => ${JSON.stringify(result)}`);
            res.status(200).json({ack: 0, result});
        } catch (error) {
            logger.error("PaymentsService => ERROR => ", error);
            res.status(500).json({ack: 1, message: JSON.parse(error)});
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            logger.debug("PaymentsService => GETTING ALL");
            const result: iPayment[] = await Payments.find();
            res.status(200).json({ack: 0, result});
        } catch (error) {
            logger.error("PaymentsService => ERROR => ", error);
            res.status(500).json({ack: 1, message: JSON.stringify(error)});
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.params.id;
            logger.debug("PaymentsService => GETTING BY ID => ", id);
            const result: iPayment = await Payments.findById(id);
            res.status(200).json({ack: 0, result});
        } catch (error) {
            logger.error("PaymentsService => ERROR => ", error);
            res.status(500).json({ack: 1, message: JSON.stringify(error)});

        }
    }
    
}