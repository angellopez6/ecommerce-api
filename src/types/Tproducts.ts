export type TGetProductsRequest = {
  limit?: number;
  offset?: number;
};

export type TCreateProductRequest = {
  name: string;
  price: number;
  image?: string;
  description?: string;
  categoryId: number;
};

export type TUpdateProductRequest = {
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  categoryId: number;
};

