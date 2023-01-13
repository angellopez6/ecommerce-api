import orm from "../libs/sequelize";
import boom from "@hapi/boom";
import { TCreateUserRequest, TUpdateUserRequest } from "@app/types/Tuser";

class UserService {
  async create(data: TCreateUserRequest) {
    const newUser = await orm.models.User.create(data);
    return newUser;
  }

  async find() {
    const res = await orm.models.User.findAll();
    return res;
  }

  async findOne(id: string) {
    const user = await orm.models.User.findByPk(id, {
      include: ["customer"],
    });
    if (!user) throw boom.notFound("User not found");
    return user;
  }

  async update(id: string, changes: TUpdateUserRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

export default UserService;
