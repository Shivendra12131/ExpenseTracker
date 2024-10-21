
# Expense Tracker Application

## Overview

This Expense Tracker Application allows users to create trips and manage expenses associated with those trips. Users can sign up, log in, create trips, and add expenses, while tracking individual contributions.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup and login)
- Create trips with descriptions and participants
- Add expenses with different split types (equal, exact, percentage)
- Retrieve expenses for a specific user or for all users

## Requirements

- Node.js (v14 or later)
- MongoDB (running instance)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd expenses_app
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (like MongoDB connection string and JWT secret).

   Example `.env` file:
   ```env
   PORT=4000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/your_db_name
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

### API Endpoints

- **User Authentication**
  - **Signup**
    - **POST** `/api/v1/signup`
    - **Request Body:**
      ```json
      {
        "email": "user@example.com",
        "password": "yourpassword"
      }
      ```

  - **Login**
    - **POST** `/api/v1/login`
    - **Request Body:**
      ```json
      {
        "email": "user@example.com",
        "password": "yourpassword"
      }
      ```

- **Trip Management**
  - **Create a Trip**
    - **POST** `/api/v1/trips`
    - **Request Body:**
      ```json
      {
        "tripName": "Trip Name",
        "tripDescription": "Description of the trip",
        "participants": ["Participant1", "Participant2"]
      }
      ```

- **Expense Management**
  - **Add an Expense**
    - **POST** `/api/v1/expenses`
    - **Request Body:**
      ```json
      {
        "tripId": "trip_id_here",
        "name": "Expense Name",
        "amount": 100,
        "splitType": "equal",
        "splitDetails": [
          {
            "participantName": "Participant1",
            "amountOwed": 50
          },
          {
            "participantName": "Participant2",
            "amountOwed": 50
          }
        ]
      }
      ```

- **Retrieve User Expenses**
  - **GET** `/api/v1/getExpenses/:userId`
    - Replace `:userId` with the participant's name.

- **Retrieve All Expenses**
  - **GET** `/api/v1/expenses`

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

1. **Testing User Signup:**
   - Send a POST request to `/api/v1/signup` with the required body.

2. **Testing User Login:**
   - Send a POST request to `/api/v1/login` with the required body.

3. **Testing Trip Creation:**
   - After logging in, send a POST request to `/api/v1/trips`.

4. **Testing Expense Addition:**
   - Send a POST request to `/api/v1/expenses` with the expense details.

5. **Retrieve Expenses:**
   - Use the GET methods to retrieve expenses for a specific user or all expenses.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

After creating the `README.md` file, you can push it to your GitHub repository. Let me know if you need help with anything else!
