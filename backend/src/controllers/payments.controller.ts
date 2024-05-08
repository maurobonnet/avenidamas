import {Request, Response, Router} from "express";
import { PaymentsService } from "../services/payments.service";

class PaymentsController {

    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        const paymentService = new PaymentsService();
        this.router.post('/add', paymentService.add);
        this.router.get('/getAll', paymentService.getAll);
        this.router.get('/getById/:id', paymentService.getById);

    }
    getRoutes() {
        return this.router;
    }
}
const paymentsController = new PaymentsController();
export default paymentsController.getRoutes();