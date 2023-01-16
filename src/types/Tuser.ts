/* eslint-disable no-unused-vars */
export type TCreateUserRequest = {
  email: string;
  password: string;
  role: string;
};

export type TUpdateUserRequest = {
  email?: string;
  role?: string;
};