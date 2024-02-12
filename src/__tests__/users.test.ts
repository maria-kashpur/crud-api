import request from "supertest";
import { usersBase as data } from "../data/users";
import { createServer } from "http";
import requestHandler from "../services/requestHandler";

const server = createServer(requestHandler);
server.listen(8000);

describe("api users", () => {
  afterAll((done) => {
    server.close(done);
    jest.clearAllMocks();
  });

  it("get all users", async () => {
    await request(server).get("/api/users").expect(200, data);
  });

  it("get user by ID", async () => {
    if (data.length > 0) {
      const { id } = data[0];
      await request(server).get(`/api/users/${id}`).expect(200, data[0]);
    }
  });

  it("create user", async () => {
    const newUser = { username: "Kate", age: 8, hobbies: ["rowing"] };
    const { statusCode, body } = await request(server)
      .post("/api/users")
      .send(newUser);
    expect(statusCode).toBe(201);
    expect(Object.keys(body).length).toEqual(4);
    expect(body.username).toBe(newUser.username);
    expect(body.age).toBe(newUser.age);
    expect(JSON.stringify(body.hobbies)).toBe(JSON.stringify(newUser.hobbies));
  });

  it("update user", async () => {
    const { id } = data[0];
    const updateData = { username: "Nick", age: 15, hobbies: [] };
    const { statusCode, body } = await request(server)
      .put(`/api/users/${id}`)
      .send(updateData);
    expect(statusCode).toBe(200);
    expect(body.username).toBe(updateData.username);
    expect(body.age).toBe(updateData.age);
    expect(JSON.stringify(body.hobbies)).toBe(
      JSON.stringify(updateData.hobbies),
    );
  });

  it("delete user", async () => {
    const { id } = data[0];
    const { statusCode } = await request(server)
      .delete(`/api/users/${id}`)
      .send(data);
    expect(statusCode).toBe(204);
    await request(server).get(`/api/users/${id}`).expect(404);
  });
});
