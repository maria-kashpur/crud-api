import { User } from "../types/types";

export let usersBase: User[] = [
  {
    age: 30,
    hobbies: ["develop"],
    id: "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
    username: "Masha",
  },
];

export const ServiceForUsersBase = {
  getUsers: () => usersBase,
  updateUsers: (updatedUsers: User[]) => (usersBase = updatedUsers),
};
