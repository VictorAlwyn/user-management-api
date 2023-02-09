import debug from "debug";
import { Op } from "sequelize";
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";
import User from "../../common/models/User";
import databaseService from "../../common/services/database.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

const log: debug.IDebugger = debug("app:users-dao");

class UsersDao {
  private Database = databaseService.getDatabase();
  private Model = User;

  constructor() {
    log("Created new instance of UsersDao ");
  }

  async addUser(userFields: CreateUserDto) {
    return this.Model.create({
      ...userFields,
      permissionFlags: PermissionFlag.USER_PERMISSION,
    });
  }

  async getUserByEmail(email: string) {
    return this.Model.findOne({
      where: { email },
      attributes: {
        exclude: ["password"],
      },
      raw: true,
    });
  }

  async getUserByEmailWithPassword(email: string) {
    return this.Model.findOne({ where: { email }, raw: true });
  }

  async removeUserByIds(userIds: string[]) {
    return this.Model.destroy({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
  }

  async getUserById(userId: string) {
    return this.Model.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
      raw: true,
    });
  }

  async getUserByIds(userIds: string[]) {
    return this.Model.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
      attributes: {
        exclude: ["password"],
      },
      raw: true,
    });
  }

  async getUsers(limit = 25, page = 0) {
    return this.Model.findAll({
      limit,
      offset: limit * page,
      attributes: {
        exclude: ["password"],
      },
    });
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    return this.Model.update(userFields, { where: { id: userId } });
  }
}

export default new UsersDao();
