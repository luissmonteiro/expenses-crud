const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
require("dotenv/config");
const { signup, login } = require("../../../src/controllers/authController");
const User = require("../../../src/models/user");
const { response, mockUser, authBody } = require("./utils");

describe("authController", () => {
  it("should return 'New user created!'", async () => {
    const req = {
      body: authBody,
    };

    const create = sinon.stub(User, "create").resolves(mockUser);
    const find = sinon.stub(User, "findOne").returns(false);

    await signup(req, response);
    create.restore();
    find.restore();
    sinon.assert.match(response.json, { message: "New user created!" });
  });

  it('should return "User already exists"', async () => {
    const req = {
      body: authBody,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await signup(req, response);
    find.restore();
    sinon.assert.match(response.json, { message: "User already exists" });
  });

  it("should return 'Missing required fields'", async () => {
    const req = { body: { email: "testuser@email.com", password: "" } };
    await signup(req, response);
    sinon.assert.match(response.json, { message: "Missing required fields" });
  });

  it("should generate a JWT token and return it", async () => {
    const req = {
      body: authBody,
    };
    const res = { json: sinon.spy() };

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash("testpassword", saltRounds);
    const mockUser = {
      _id: "userId",
      email: "testuser@email.com",
      password: hashedPassword,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    generateToken = jwt.sign({ userId: "userId" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await login(req, res);
    find.restore();
    sinon.assert.calledWith(
      res.json,
      sinon.match({ user: mockUser, token: generateToken }),
    );
  });

  it("should return 'Invalid Credentials'", async () => {
    const req = {
      body: authBody,
    };

    const mockUser = {
      _id: "userId",
      email: "testuser@email.com",
      password: "123",
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await login(req, response);
    find.restore();
    sinon.assert.match(response.json, { message: "Invalid Credentials" });
  });

  it("should return 'Invalid Credentials' (second case)", async () => {
    const req = {
      body: authBody,
    };
    const find = sinon.stub(User, "findOne").returns(null);

    await login(req, response);
    find.restore();
    sinon.assert.match(response.json, { message: "Invalid Credentials" });
  });
});
