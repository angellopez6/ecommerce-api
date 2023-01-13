import { TCreateProductRequest, TGetProductsRequest, TUpdateProductRequest } from "../types/Tproducts";
import orm from "../libs/sequelize";
import boom from "@hapi/boom";

class ProductsService {
  async create(data: TCreateProductRequest) {
    const newProduct = await orm.models.Product.create(data);
    return newProduct;
  }

  async find({ ...rest }: TGetProductsRequest) {
    const options = {...rest };
    const res = await orm.models.Product.findAll(options);
    return res;
  }

  async findOne(id: string) {
    const product = await orm.models.Product.findByPk(id, {
      include: ["category"],
    });
    if (!product) throw boom.notFound("Product not found");
    return product;
  }

  async update(id: string, changes: TUpdateProductRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product: any = await this.findOne(id);
    const res = await product.update(changes);
    return res;
  }

  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product: any = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

export default ProductsService;
