const sinon = require("sinon");

const res = {
  end: function () {},
  status: function (s) {
    this.statusCode = s;
    this.json = (message) => {
      this.json = message;
      return this;
    };
    return this;
  },
};

const spyResponse = {
  json: sinon.spy(),
  status: function (s) {
    this.statusCode = s;
    this.json = (message) => {
      this.json = message;
      return this;
    };
    return this;
  },
};

const mockUser = {
  _id: "userId",
  email: "testuser@email.com",
  password: "hashedPassword",
};

const authBody = { email: "testuser@email.com", password: "testpassword" };

const expenseBody = {
  description: "Test expense",
  value: 100,
  date: "01/01/2022",
  userId: "userId",
  deleted: false,
};

const negativeValueExpense = {
  description: "Test expense",
  value: -1,
  date: "01/01/2022",
};

const wrongTypeValueExpense = {
  description: "Test expense",
  value: "100",
  date: "01/01/2022",
};

const biggerDescriptionExpense = {
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
  value: 100,
  date: "01/01/2022",
};

const limitDescriptionSize = {
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  value: 100,
  date: "01/01/2022",
};

const dateInFutureBody = {
  description: "Test expense",
  value: 100,
  date: "01/01/2025",
};

const dateAsStringBody = {
  description: "Test expense",
  value: 100,
  date: "Test",
};

module.exports = {
  response: res,
  spyResponse: spyResponse,
  mockUser: mockUser,
  authBody: authBody,
  expenseBody: expenseBody,
  negativeValueExpense: negativeValueExpense,
  wrongTypeValueExpense: wrongTypeValueExpense,
  biggerDescriptionExpense: biggerDescriptionExpense,
  limitDescriptionSize: limitDescriptionSize,
  dateInFutureBody: dateInFutureBody,
  dateAsStringBody: dateAsStringBody,
};
