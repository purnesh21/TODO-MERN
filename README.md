

# ToDo Application

A simple ToDo application that allows users to register, login, and manage their todos. The application is built using Node.js, Express, MongoDB, and React with Vite as the frontend bundler. User sessions are managed using the Context API.

## Features

- User Registration
- User Login
- Add, Edit, Delete ToDos
- View ToDos
- User Authentication and Authorization
- Session management with Context API

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Mongoose, bcrypt
- **Session Management**: Context API

## Installation


1. **Install backend dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **Install frontend dependencies:**

   Navigate to the frontend directory and install the necessary packages:

   ```bash
   cd frontend
   npm install
   ```

4. **Run the application:**

   Start the backend server:

   ```bash
   npm start
   ```

   Start the frontend server:

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5000` for the backend and `http://localhost:5173` for the frontend.
