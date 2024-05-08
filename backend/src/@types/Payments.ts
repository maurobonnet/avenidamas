export interface iCardHolderIdentification {
  type: string;
  number: string
}
export interface iRequestGetToken {
  card_number: string;
  card_expiration_month: string;
  card_expiration_year: string;
  security_code: string;
  card_holder_name: string;
  card_holder_birthday: string;
  card_holder_door_number: number;
  card_holder_identification: iCardHolderIdentification
}

export interface iResponseWithToken {
  id: string;
  status: string;
  card_number_length: number;
  date_created: string;
  bin: string;
  last_four_digits: string;
  security_code_length: number;
  expiration_month: number;
  expiration_year: number;
  date_due: string;
  cardholder: {
    identification: {
      name: string;
      birthday: string;
      nro_puerta: number;
    }
  }
}

export interface iRequestSendPayment {
  site_transaction_id: string;
  token: string;
  payment_method_id: number;
  bin: string;
  amount: number;
  currency: string;
  installments: number;
  payment_type: string;
  sub_payments: any[];
}

export interface iPayment {
  id: number;
  site_transaction_id: string;
  payment_method_id: number;
  card_brand: string;
  amount: number;
  currency: string;
  status: string;
  status_details: {
    ticket: string;
    card_authorization_code: string;
    address_validation_code: string;
    error: any | null; 
  };
  date: string;
  payment_mode: any | null;
  customer: any | null; 
  bin: string;
  installments: number;
  first_installment_expiration_date: string | null;
  payment_type: string;
  sub_payments: any; 
  site_id: string;
  fraud_detection: any | null; 
  aggregate_data: any | null; 
  establishment_name: string | null;
  spv: any | null; 
  confirmed: any | null; 
  pan: string | null;
  customer_token: string | null;
  card_data: string;
  token: string;
  authenticated_token: string | null;
}