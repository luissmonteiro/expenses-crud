const { expect } = require("chai");
const sinon = require("sinon");
const Expense = require("../../../src/models/expense.js");
const User = require("../../../src/models/user");
const {
  createExpense,
  listExpenses,
  getEspecificExpense,
  updateExpense,
  deleteExpense,
} = require("../../../src/controllers/expenseController");
const {
  mockUser,
  spyResponse,
  expenseBody,
  negativeValueExpense,
  limitDescriptionSize,
  wrongTypeValueExpense,
  biggerDescriptionExpense,
  dateInFutureBody,
  dateAsStringBody,
} = require("./utils");

describe("createExpense", () => {
  it("should create a new expense", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: expenseBody,
    };

    const create = sinon.stub(Expense, "create").resolves(req);
    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    create.restore();
    find.restore();

    sinon.assert.match(spyResponse.json.body, req.body);
  });

  it("should return 'User not found'", async () => {
    const req = {
      auth: {
        userId: "123",
      },
      body: expenseBody,
    };
    const find = sinon.stub(User, "findOne").returns(null);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "User not found" });
  });

  it('should return "Invalid value"', async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: negativeValueExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid value" });
  });

  it('should return "Invalid value" message', async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: wrongTypeValueExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid value" });
  });

  it("should return description error message", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: biggerDescriptionExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, {
      message: "Description must have the maximum of 191 chacacters",
    });
  });

  it("should create expense (description length == 191)", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: limitDescriptionSize,
    };
    const create = sinon.stub(Expense, "create").resolves(req);
    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();
    create.restore();

    sinon.assert.match(spyResponse.json.body, req.body);
  });

  it("should return 'Invalid date'", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: dateInFutureBody,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid date" });
  });

  it("should return 'Invalid date'", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: dateAsStringBody,
    };
    const find = sinon.stub(User, "findOne").returns(mockUser);

    await createExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid date" });
  });
});

describe("listExpenses", () => {
  it("should return expenses array", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      body: {},
    };
    const mockExpenses = [
      { expenseBody, user: "userId" },
      { expenseBody, user: "userId" },
    ];

    const create = sinon.stub(Expense, "find").resolves(mockExpenses);
    const find = sinon.stub(User, "findOne").returns(mockUser);

    await listExpenses(req, spyResponse);
    create.restore();
    find.restore();

    sinon.assert.match(spyResponse.json, mockExpenses);
  });

  it("should return 'User not found'", async () => {
    const req = {
      auth: {},
      body: expenseBody,
    };

    const find = sinon.stub(User, "findOne").returns(null);

    await listExpenses(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "User not found" });
  });
});

describe("getEspecificExpense", () => {
  it("should return expense", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
    };

    const create = sinon.stub(Expense, "findOne").resolves(expenseBody);

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await getEspecificExpense(req, spyResponse);
    create.restore();
    find.restore();

    sinon.assert.match(spyResponse.json, expenseBody);
  });

  it("should return 'User not found'", async () => {
    const req = {
      auth: {},
      params: {
        id: "testExpenseId",
      },
    };
    const find = sinon.stub(User, "findOne").returns(null);

    await getEspecificExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "User not found" });
  });

  it("should return 'Expense not found'", async () => {
    const req = {
      auth: {
        userId: "662bb9cdf9adf0eb8f936099", //does not exist
      },
      params: {
        id: "testExpenseId",
      },
    };
    const create = sinon.stub(Expense, "findOne").resolves(null);
    const mockUser = {
      _id: "662bb9cdf9adf0eb8f936099",
      email: "testuser@email.com",
      password: "testpassword",
    };
    const find = sinon.stub(User, "findOne").returns(mockUser);

    await getEspecificExpense(req, spyResponse);
    create.restore();
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Expense not found" });
  });
});

describe("updateExpense", () => {
  it("should return the updated expense", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: expenseBody,
    };
    const mockUpdatedExpense = {
      id: "testExpenseId",
      description: "Test expense",
      value: 300,
      date: "30/01/2022",
      user: "userId",
    };
    const findExpense = sinon.stub(Expense, "findOne").resolves(expenseBody);
    const update = sinon
      .stub(Expense, "findOneAndUpdate")
      .resolves(mockUpdatedExpense);

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    update.restore();
    find.restore();
    findExpense.restore();

    sinon.assert.match(spyResponse.json, mockUpdatedExpense);
  });

  it("should return 'User not found'", async () => {
    const req = {
      auth: {
        userId: "123",
      },
      params: {
        id: "testExpenseId",
      },
      body: {
        description: "Test expense",
        value: 1,
        date: "01/01/2022",
      },
    };
    const find = sinon.stub(User, "findOne").returns(null);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "User not found" });
  });

  it('should return "Invalid value message', async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: negativeValueExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid value" });
  });

  it('should return "Invalid value" message', async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: wrongTypeValueExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid value" });
  });

  it("should return 'Description must have the maximum of 191 chacacters'", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: biggerDescriptionExpense,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, {
      message: "Description must have the maximum of 191 chacacters",
    });
  });

  it("should create expense (Description equals 191 characters)", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: limitDescriptionSize,
    };
    const mockUpdatedExpense = {
      id: "testExpenseId",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      value: 300,
      date: "30/01/2022",
      user: "userId",
    };
    const findExpense = sinon.stub(Expense, "findOne").resolves(expenseBody);
    const update = sinon
      .stub(Expense, "findOneAndUpdate")
      .resolves(mockUpdatedExpense);

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();
    findExpense.restore();
    update.restore();
    sinon.assert.match(spyResponse.json, mockUpdatedExpense);
  });

  it("should return 'Invalid date' message", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: dateInFutureBody,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid date" });
  });

  it("should return 'Invalid date' message", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: dateAsStringBody,
    };

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await updateExpense(req, spyResponse);
    find.restore();

    sinon.assert.match(spyResponse.json, { message: "Invalid date" });
  });

  it("should return error message", async () => {
    const req = {
      auth: {
        userId: "662bb9cdf9adf0eb8f936099", //does not exist
      },
      params: {
        id: "testExpenseId",
      },
      body: {
        description: "Test expense",
        value: 100,
        date: "01/01/2024",
      },
    };

    const create = sinon.stub(Expense, "findOne").resolves(null);
    const mockUser = {
      _id: "662bb9cdf9adf0eb8f936099",
      email: "testuser@email.com",
      password: "testpassword",
    };
    const find = sinon.stub(User, "findOne").returns(mockUser);
    const update = sinon.stub(Expense, "findOneAndUpdate").resolves(null);

    await updateExpense(req, spyResponse);
    create.restore();
    find.restore();
    update.restore();
    sinon.assert.match(spyResponse.json, { message: "Expense not found" });
  });
});

describe("deleteExpense", () => {
  it("should return the updated expense", async () => {
    const req = {
      auth: {
        userId: "userId",
      },
      params: {
        id: "testExpenseId",
      },
      body: {
        description: "Test delete expense",
        date: "01/01/2022",
        value: 100,
      },
    };

    const mockUpdatedExpense = {
      id: "testExpenseId",
      description: "Test expense",
      value: 100,
      date: "01/01/2022",
      user: "userId",
      deleted: true,
    };
    const findExpense = sinon.stub(Expense, "findOne").resolves(expenseBody);
    const update = sinon
      .stub(Expense, "findOneAndUpdate")
      .resolves(mockUpdatedExpense);

    const find = sinon.stub(User, "findOne").returns(mockUser);

    await deleteExpense(req, spyResponse);
    update.restore();
    find.restore();
    findExpense.restore();
    sinon.assert.match(spyResponse.json, { message: "Expense deleted!" });
  });

  it("should return 'Expense not found' message", async () => {
    const req = {
      auth: {
        userId: "662bb9cdf9adf0eb8f936099", //does not exist
      },
      params: {
        id: "testExpenseId",
      },
    };

    const create = sinon.stub(Expense, "findOne").resolves(null);
    const mockUser = {
      _id: "662bb9cdf9adf0eb8f936099",
      email: "testuser@email.com",
      password: "testpassword",
    };
    const find = sinon.stub(User, "findOne").returns(mockUser);
    const update = sinon.stub(Expense, "findOneAndUpdate").resolves(null);

    await deleteExpense(req, spyResponse);
    create.restore();
    find.restore();
    sinon.assert.match(spyResponse.json, { message: "Expense not found" });
  });

  it("should return 'User not found' message", async () => {
    const req = {
      auth: {
        userId: "662bb9cdf9adf0eb8f936099", //does not exist
      },
      params: {
        id: "testExpenseId",
      },
    };

    const find = sinon.stub(User, "findOne").returns(null);

    await deleteExpense(req, spyResponse);
    find.restore();
    sinon.assert.match(spyResponse.json, { message: "User not found" });
  });
});
