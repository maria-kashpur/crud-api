import { User } from "../types/types";

export default class UserModel {
  static async getAll() {
    console.log("user model: all users");
  }

  static async getByID(id: User["id"]) {
    console.log(`user model: user ${id}`);
  }

  static async add(data: Omit<User, "id">) {
    console.log(`user model: new user`, data);
  }

  static async delete(id: User["id"]) {
    console.log(`user model: delete user ${id}`);
  }

  static async update(id: User["id"], data: Omit<User, "id">) {
    console.log(`user model: update user ${id}`, data);
  }
}
