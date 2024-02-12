import { User } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { usersBase as users } from "./../data/users";

export default class UserModel {
  static async getAll() {
    return users;
  }

  static async getByID(id: User["id"]) {
    const user = users.find((el) => el.id === id);
    return user;
  }

  static async add(data: Omit<User, "id">) {
    const id = uuidv4();
    const user = { ...data, id };
    users.push(user);
    return user;
  }

  static async delete(id: User["id"]) {
    const indexUserData = users.findIndex((user) => user.id === id);
    if (indexUserData === -1) {
      return false;
    }
    users.splice(indexUserData, 1);
    return true;
  }

  static async update(id: User["id"], data: Omit<User, "id">) {
    const indexUserData = users.findIndex((user) => user.id === id);
    if (indexUserData === -1) {
      return false;
    }
    users[indexUserData] = { id, ...data };
    return users[indexUserData];
  }

  static checkData(data: unknown) {
    if (typeof data !== "object") return false;
    if (
      !data ||
      !("age" in data) ||
      !("username" in data) ||
      !("hobbies" in data)
    )
      return false;

    if (Object.keys(data).length !== 3) return false;

    if (typeof data.age !== "number") return false;

    if (typeof data.username !== "string") return false;

    if (!Array.isArray(data.hobbies)) return false;

    if (data.hobbies.length > 0) {
      const hobbiesIsStrung = data.hobbies.filter(
        (el) => typeof el === "string",
      );

      if (data.hobbies.length !== hobbiesIsStrung.length) return false;
    }

    return true;
  }
}
