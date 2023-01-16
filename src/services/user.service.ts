import orm from "../libs/sequelize";
import boom from "@hapi/boom";
import { TCreateUserRequest, TUpdateUserRequest } from "../types/Tuser";
import bcryp from "bcrypt";
import { userMap } from "../map/user.map";

class UserService {
  async create(data: TCreateUserRequest) {
    data.password = await bcryp.hash(data.password, 10);
    const newUser = await orm.models.User.create(data);
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    return newUser;
  }

  async find() {
    const users = await orm.models.User.findAll();
    const usersMaped = userMap(users);
    return usersMaped;
  }

  async findOne(id: string) {
    const user = await orm.models.User.findByPk(id, {
      include: ["customer"],
    });
    if (!user) throw boom.notFound("User not found");
    delete user.dataValues.password;
    return user;
  }

  async findByEmail(email: string) {
    const user = await orm.models.User.findOne({
      where: { email },
    });
    return user;
  }

  async update(id: string, changes: TUpdateUserRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = await this.findOne(id);
    const res = await user.update(changes);
    delete res.dataValues.password;
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
