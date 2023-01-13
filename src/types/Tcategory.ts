/* eslint-disable no-unused-vars */
export type TCreateCategoryRequest = {
  name: string;
  image?: string;
  description?: string;
};

export type TUpdateCategoryRequest = {
  name?: string;
  image?: string;
  description?: string;
};
