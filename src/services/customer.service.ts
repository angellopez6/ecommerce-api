import orm from "../libs/sequelize";
import boom from "@hapi/boom";
import {
  TCreateCustomerRequest,
  TUpdateCustomerRequest,
} from "../types/Tcustomer";

class CustomerService {
  async create(data: TCreateCustomerRequest) {
    const newCustomer = await orm.models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const res = await orm.models.Customer.findAll();
    return res;
  }

  async findOne(id: string) {
    const customer = await orm.models.Customer.findByPk(id, {
      include: ["user"],
    });
    if (!customer) throw boom.notFound("Customer not found");
    return customer;
  }

  async update(id: string, changes: TUpdateCustomerRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customer: any = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customer: any = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

export default CustomerService;
