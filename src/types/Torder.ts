/* eslint-disable no-unused-vars */
export type TCreateOrderRequest = {
  customerId: string;
};

export type TaddItemOrderRequest = {
  orderId: string;
  productId: string;
  amount: number;
};