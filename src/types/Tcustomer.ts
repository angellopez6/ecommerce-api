/* eslint-disable no-unused-vars */
export type TCreateCustomerRequest = {
  name: string;
  lastName: string;
  surname: string;
  birthday: Date;
  phone?: string;
  userId: number;
};

export type TUpdateCustomerRequest = {
  name?: string;
  lastName?: string;
  surname?: string;
  birthday?: Date;
  phone?: string;
  userId?: number;
};
