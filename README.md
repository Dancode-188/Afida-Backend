# AFIDA: Revolutionizing Crowdfunding with Blockchain

## Table of Contents

1. [Introduction](#introduction)

2. [Features](#features)

3. [Technologies](#technologies)

4. [System Requirements](#system-requirements)

5. [Installation](#installation)

6. [Configuration](#configuration)

7. [Usage](#usage)

8. [API Endpoints](#api-endpoints)

9. [Database Schema](#database-schema)

10. [Testing](#testing)

11. [Deployment](#deployment)

12. [Contributing](#contributing)

13. [License](#license)

14. [Contact](#contact)

## Introduction

AFIDA Backend is a robust Node.js server application designed to support a blockchain-based crowdfunding platform. It provides a RESTful API for user management, project creation, and contribution handling, integrating seamlessly with blockchain technologies for secure and transparent transactions.

## Features

- User authentication and authorization

- Project management (creation, retrieval)

- Contribution handling

- Integration with smart wallets for blockchain transactions

- Secure API endpoints with JWT authentication

- Data validation using Joi

- MongoDB integration for data persistence

- Flexible project categorization with case-insensitive handling

## Technologies

- Node.js

- Express.js

- MongoDB with Mongoose ORM

- JSON Web Tokens (JWT) for authentication

- Bcrypt for password hashing

- Joi for data validation

- Ethereum blockchain integration (via Web3.js and @coinbase/wallet-sdk)

- Jest for testing

## System Requirements

- Node.js (v14.x or later)

- MongoDB (v4.x or later)

- npm (v6.x or later)

## Installation

1. Clone the repository:

```

git clone https://github.com/tessie17/afida-backend.git

cd afida-backend

```

2. Install dependencies:

```

npm install

```

3. Set up environment variables (see [Configuration](#configuration) section).

4. Start the server:

```

npm start

```

## Configuration

Create a `.env` file in the root directory with the following variables:

```

PORT=5000

MONGO_URI=your_mongoDB_URI

TOKEN_SECRET=your_jwt_secret_key

MONGO_URI_TEST=your_mongoDB_URI

```

Adjust the values according to your development environment.

## Usage

After starting the server, the API will be available at `http://localhost:5000` (or the port specified in your .env file).

When creating or querying projects, keep in mind:

- Project categories are case-insensitive. "Technology", "TECHNOLOGY", and "technology" are treated the same.

- Categories must be between 2 and 50 characters long.

- When retrieving projects, categories will always be in lowercase.

## API Endpoints

### Users

- POST `/api/users/register`: Register a new user

- Body: `{ name, email, password, smartWalletAddress }`

- POST `/api/users/login`: Authenticate a user

- Body: `{ email, password }`

### Projects

- POST /api/projects: Create a new project (requires authentication)

    - Body: `{ name, description, category, targetAmount }`

    - Note: The category is case-insensitive and will be stored in lowercase

- GET `/api/projects`: Retrieve all projects

    - Note: Project categories are returned in lowercase

### Contributions

- POST `/api/contributions`: Make a contribution to a project (requires authentication)

- Body: `{ projectId, amount }`

- GET `/api/contributions`: Retrieve all contributions for the authenticated user

All POST requests should include the `Content-Type: application/json` header.

Authenticated routes require a `Bearer` token in the `Authorization` header.

## Database Schema

### User

- name: String (required)

- email: String (required, unique)

- password: String (required, hashed)

- smartWalletAddress: String (required)

- date: Date

### Project

- name: String (required)

- description: String (required)

- category: String (required, min length: 2, max length: 50, stored as lowercase)

- targetAmount: Number (required, min: 1)

- organizer: ObjectId (ref: 'User')

- date: Date

### Contribution

- donor: ObjectId (ref: 'User')

- project: ObjectId (ref: 'Project')

- amount: Number (required, min: 1)

- date: Date

## Testing

The project uses Jest for testing. Currently, unit tests are implemented and functional.

Run tests with:

```

npm test

```

Note: Integration and E2E tests are currently disabled due to setup issues. They will be re-implemented in future updates.


## Deployment

The AFIDA backend is currently deployed on Heroku. Follow these steps to deploy your own instance or update the existing deployment:

1. Ensure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and are logged in.

2. If you haven't already, create a new Heroku app:

```

heroku create your-app-name

```

3. Set up the necessary environment variables on Heroku:

```

heroku config:set MONGO_URI=your_production_mongoDB_URI

heroku config:set TOKEN_SECRET=your_production_jwt_secret

# Set any other necessary environment variables

```

4. Push your code to Heroku:

```

git push heroku main

```

5. Ensure at least one dyno is running:

```

heroku ps:scale web=1

```

6. Open your deployed app:

```

heroku open

```

To view logs and troubleshoot any issues:

```

heroku logs --tail

```

Remember to update your frontend application to use the new Heroku URL for API requests.

For any deployment-related issues or questions, please contact the project maintainer.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Tessy Achieng - [tessyachieng17@gmail.com](mailto:tessyachieng17@gmail.com)

Project Link: [https://github.com/tessie17/afida-backend](https://github.com/tessie17/afida-backend)