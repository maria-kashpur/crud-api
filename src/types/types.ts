export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
