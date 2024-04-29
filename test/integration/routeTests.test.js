const request = require("supertest");
const chai = require("chai");
const app = require("../../server");
const {
  clearDatabase,
  USER_EMAIL,
  USER_PASS,
  expenseMock,
  alternativeExpense,
} = require("./utils");

const { expect } = chai;

describe("POST /signup", () => {
  it("should create a new user and return it", async () => {
    await clearDatabase();
    const res = await request(app).post("/auth/signup").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });

    expect(res.status).to.equal(201);
  });
});

describe("POST /login", () => {
  it("should return a token and the user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("user");
    expect(res.body).to.have.property("token");
  });
});

describe("POST /create", () => {
  it("should create a new expense and return it", async () => {
    const login = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    const token = login.body.token;
    const user = login.body.user;

    const res = await request(app)
      .post("/api/create")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseMock);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("description", expenseMock.description);
    expect(res.body).to.have.property("value", expenseMock.value);
  });
});

describe("GET /list", () => {
  it("should return a list of expenses", async () => {
    const login = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    const token = login.body.token;

    const res = await request(app)
      .get("/api/list")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body[0]).to.have.property("description");
    expect(res.body[0]).to.have.property("value");
    expect(res.body[0]).to.have.property("date");
  });
});

describe("GET /getExpense/:id", () => {
  it("should return a specific expense", async () => {
    const login = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    const token = login.body.token;

    const createExpense = await request(app)
      .post("/api/create")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseMock);
    const expense = createExpense.body;

    const res = await request(app)
      .get(`/api/get/${expense._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("description", "test description");
    expect(res.body).to.have.property("value", 10);
  });
});

describe("PUT /update/:id", () => {
  it("should update an expense", async () => {
    const login = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    const token = login.body.token;

    const createExpense = await request(app)
      .post("/api/create")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseMock);
    const expense = createExpense.body;

    const res = await request(app)
      .put(`/api/update/${expense._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(alternativeExpense);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property(
      "description",
      alternativeExpense.description,
    );
    expect(res.body).to.have.property("value", alternativeExpense.value);
  });
});

describe("DELETE /delete", async () => {
  it("should delete an expense", async () => {
    const login = await request(app).post("/auth/login").send({
      email: USER_EMAIL,
      password: USER_PASS,
    });
    const token = login.body.token;

    const createExpense = await request(app)
      .post("/api/create")
      .set("Authorization", `Bearer ${token}`)
      .send(expenseMock);
    const expense = createExpense.body;

    const res = await request(app)
      .delete(`/api/delete/${expense._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    clearDatabase();
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Expense deleted!");
  });
});
