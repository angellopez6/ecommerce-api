import orm from "../libs/sequelize";
import {
  TCreateCategoryRequest,
  TUpdateCategoryRequest,
} from "@app/types/Tcategory";
import boom from "@hapi/boom";

class CategoryService {
  async create(data: TCreateCategoryRequest) {
    const newCategory = await orm.models.Category.create(data);
    return newCategory;
  }

  async find() {
    const res = await orm.models.Category.findAll();
    return res;
  }

  async findOne(id: string) {
    const category = await orm.models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) throw boom.notFound("Category not found");
    return category;
  }

  async update(id: string, changes: TUpdateCategoryRequest) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category: any = await this.findOne(id);
    const res = await category.update(changes);
    return res;
  }
  
  async delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category: any = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

export default CategoryService;
