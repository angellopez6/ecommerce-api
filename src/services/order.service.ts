import orm from "../libs/sequelize";
import boom from "@hapi/boom";
import { TaddItemOrderRequest, TCreateOrderRequest } from "@app/types/Torder";

class OrderService {
  async create(data: TCreateOrderRequest) {
    const newOrder = await orm.models.Order.create(data);
    return newOrder;
  }

  async addItem(data: TaddItemOrderRequest) {
    const newItem = await orm.models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const res = await orm.models.Order.findAll();
    return res;
  }

  async findOne(id: string) {
    const user = await orm.models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        "items"
      ],
    });
    if (!user) throw boom.notFound("Order not found");
    return user;
  }
}

export default OrderService;
