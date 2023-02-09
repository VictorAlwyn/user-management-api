import { expect } from "chai";
import supertest from "supertest";
import app from "../../app";

let firstUserIdTest = "";
const firstUserBody = {
  email: "test1@test.com",
  password: "Sup3rSecret!23",
  firstName: "testFirstName",
  lastName: "testLastName",
  username: "testUsername",
};

let accessToken = "";
let refreshToken = "";
const newFirstName = "alwyn";
const newFirstName2 = "victor";
const newLastName2 = "doe";

describe("users and auth endpoints", function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });

  it("should allow a POST to /users", async function () {
    const res = await request.post("/users").send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.id).to.be.a("string");
    firstUserIdTest = res.body.id;
  });

  it("should allow a POST to /auth", async function () {
    const res = await request.post("/auth").send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("object");
    expect(res.body.accessToken).to.be.a("string");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  describe("with a valid access token", function () {
    it("should allow a GET from /users/:userId", async function () {
      const res = await request
        .get(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an("object");
      expect(res.body.id).to.be.a("string");
      expect(res.body.id).to.equal(firstUserIdTest);
      expect(res.body.email).to.equal(firstUserBody.email);
    });

    it("should allow a PATCH to /users/:userId", async function () {
      const res = await request
        .patch(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          firstName: newFirstName,
        });
      expect(res.status).to.equal(204);
    });

    it("should disallow a PUT to /users/:userId with an nonexistent ID", async function () {
      const res = await request
        .put(`/users/i-do-not-exist`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: "John",
          lastName: "Doe",
          permissionFlags: 1,
        });
      expect(res.status).to.equal(404);
    });

    it("should disallow a DELETE from /users/:userIds", async function () {
      const res = await request
        .delete(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(403);
    });

    it("should allow a PUT to /users/:userId to change first and last names", async function () {
      const res = await request
        .put(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: newFirstName2,
          lastName: newLastName2,
          username: firstUserBody.username,
        });
      expect(res.status).to.equal(204);
    });

    it("should allow a GET from /users/:userId and should have a new full name", async function () {
      const res = await request
        .get(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an("object");
      expect(res.body.id).to.be.a("string");
      expect(res.body.firstName).to.equal(newFirstName2);
      expect(res.body.lastName).to.equal(newLastName2);
      expect(res.body.email).to.equal(firstUserBody.email);
      expect(res.body.id).to.equal(firstUserIdTest);
    });
  });
});
