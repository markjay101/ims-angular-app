export interface PaymentMethod {
  id: string;
  methodName: string;
  accountName: string;
  accountNumber: string;
}

export interface CreatePaymentMethodDto {
  methodName: string;
  accountName: string;
  accountNumber: string;
}

export interface UpdatePaymentMethodDto {
  paymentMethodId: string;
  accountName: string;
  accountNumber: string;
}
