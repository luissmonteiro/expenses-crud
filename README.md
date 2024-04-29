Sure! Here's a sample README file for your project:

---

# Expense CRUD API

Expenses CRUD API is a RESTful API built using Node.js and Express.js for managing user authentication and CRUD operations for expenses. This API allows users to sign up, log in, create, retrieve, update, and delete expenses, with authentication mechanisms in place to ensure data security.

## Features

- User authentication (sign up, log in) with JWT (JSON Web Tokens)
- CRUD operations for expenses (Create, Read, Update, Delete)
- Secure routes with user authentication
- Error handling for various scenarios
- Swagger documentation for API endpoints

## Installation

1. Clone the repository:

```bash
git clone https://github.com/luissmonteiro/expenses-crud.git
```

2. Install dependencies:

```bash
cd expenses-crud
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_database_connection_string
```

Replace `your_jwt_secret_key` with your preferred JWT secret key and `your_database_connection_string` with the connection string for your MongoDB database.

4. Start the server:

```bash
npm start
```

The server will start running at `http://localhost:3000`.

## Usage

### Sign Up

To create a new user account, send a POST request to `/auth/signup` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Log In

To log in to an existing user account, send a POST request to `/auth/login` with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

### Expense Routes

The following routes are available for managing expenses:

- `POST /api/create`: Create a new expense (requires authentication)
- `GET /api/list`: Get a list of all expenses (requires authentication)
- `GET /api/get/:id`: Get a specific expense by ID (requires authentication)
- `PUT /api/update/:id`: Update an expense by ID (requires authentication)
- `DELETE /api/delete/:id`: Delete an expense by ID (requires authentication)

### Swagger Documentation

The API endpoints are documented using Swagger. You can access the Swagger documentation at `http://localhost:3000/api-docs`.

### Testing

```bash
npm run test
```

### MVC Architecture
This project follows the Model-View-Controller (MVC) architecture pattern, separating the application into three interconnected components:

- `Model`:  Represents the data and business logic of the application. In this API, the models represent users and expenses, handling database interactions.
- `View`: Represents the presentation layer of the application. Since this is an API, there are no traditional views. Instead, the responses from the API serve as the "view" for client applications consuming the API.
- `Controller`: Acts as an intermediary between the Model and View, handling user requests, processing input, and returning appropriate responses. Controllers in this API handle user authentication and CRUD operations for expenses.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README according to your project's specific details and requirements.