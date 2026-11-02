# Backend CRUD Assignment

A beginner-friendly REST API built with Node.js, Express, MongoDB Atlas and Mongoose. It demonstrates a model-controller-route structure and CRUD operations.

## 1. Requirements

- Node.js (18 or newer recommended)
- npm
- MongoDB Atlas account and database cluster
- Postman Desktop
- Git and a GitHub account

## 2. Install and configure

```bash
npm install
```

Copy `.env.example` to a new file named `.env` and replace the example MongoDB URI with your own Atlas connection string.

Never commit `.env` or share your database password. `.gitignore` excludes it from Git.

## 3. Run the API

```bash
npm run dev
```

Open `http://localhost:5000` in a browser. You should see a JSON status response.

## 4. Postman tests

Base URL: `http://localhost:5000`

### Create a user
- Method: `POST`
- URL: `http://localhost:5000/api/users`
- Body → raw → JSON:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 21
}
```

Copy the `_id` returned in the response.

### Read all users
- Method: `GET`
- URL: `http://localhost:5000/api/users`

### Read one user
- Method: `GET`
- URL: `http://localhost:5000/api/users/PASTE_ID_HERE`

### Update a user
- Method: `PUT`
- URL: `http://localhost:5000/api/users/PASTE_ID_HERE`
- Body → raw → JSON:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 22
}
```

### Delete a user
- Method: `DELETE`
- URL: `http://localhost:5000/api/users/PASTE_ID_HERE`

## 5. Project structure

```text
backend-crud-assignment/
├── src/
│   ├── config/db.js
│   ├── controllers/userController.js
│   ├── models/User.js
│   ├── routes/userRoutes.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 6. GitHub upload

Create an empty **public** repository on GitHub. Then, from this project folder:

```bash
git init
git add .
git commit -m "Build Express MongoDB CRUD API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own repository URL. Verify that `.env` is not listed in the files on GitHub.

## 7. What to explain in your evaluation

- Node.js runs JavaScript outside the browser.
- Express handles HTTP requests and routes.
- MongoDB stores records as documents.
- Mongoose defines schemas/models and validates data.
- A route maps an HTTP method and URL to a controller.
- A controller contains the request-handling logic.
- CRUD means Create, Read, Update and Delete.
- `.env` stores configuration/secrets outside source code.
- Postman sends requests and displays API responses.

## Troubleshooting

- **MongoDB connection fails:** verify the URI, username/password, Atlas Network Access IP allowlist, and database user permissions.
- **Authentication failed:** URL-encode special characters in the database password in the URI.
- **Port already in use:** change `PORT` in `.env`.
- **Email already exists:** use a different email; email is unique in this model.
- **Validation error:** check that `name`, `email`, and `age` are supplied and valid.
