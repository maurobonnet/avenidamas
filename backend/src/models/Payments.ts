import mongoose, { Schema } from "mongoose";
import { iPayment } from "../@types/Payments";

const paymentSchema: Schema = new Schema<iPayment>({
  id: { type: Number, required: false },
  site_transaction_id: { type: String, required: false },
  payment_method_id: { type: Number, required: false },
  card_brand: { type: String, required: false },
  amount: { type: Number, required: false },
  currency: { type: String, required: false },
  status: { type: String, required: false },
  status_details: {
    ticket: { type: String, required: false },
    card_authorization_code: { type: String, required: false },
    address_validation_code: { type: String, required: false },
    error: { type: Schema.Types.Mixed, required: false }
  },
  date: { type: String, required: false },
  payment_mode: { type: Schema.Types.Mixed, required: false },
  customer: { type: Schema.Types.Mixed, required: false },
  bin: { type: String, required: false },
  installments: { type: Number, required: false },
  first_installment_expiration_date: { type: String, required: false },
  payment_type: { type: String, required: false },
  sub_payments: { type: Schema.Types.Mixed, required: false },
  site_id: { type: String, required: false },
  fraud_detection: { type: Schema.Types.Mixed, required: false },
  aggregate_data: { type: Schema.Types.Mixed, required: false },
  establishment_name: { type: String, required: false },
  spv: { type: Schema.Types.Mixed, required: false },
  confirmed: { type: Schema.Types.Mixed, required: false },
  pan: { type: String, required: false },
  customer_token: { type: String, required: false },
  card_data: { type: String, required: false },
  token: { type: String, required: false },
  authenticated_token: { type: String, required: false }
});

export const Payments = mongoose.model<iPayment>('Payments', paymentSchema);
