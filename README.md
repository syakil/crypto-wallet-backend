# Crypto Wallet Backend with NestJS and Prisma

This repository contains the backend implementation of a simple Crypto wallet application using Node.js, NestJS, Prisma ORM, and PostgreSQL. The following instructions will guide you on setting up, building, and running the services.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/syakil/crypto-wallet-backend
    ```

2. Navigate to the project directory:

    ```bash
    cd crypto-wallet-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root and configure the following variables:

    ```env
    DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database
    ```

    Replace `your-username`, `your-password`, and `your-database` with your PostgreSQL credentials.

5. Run migrations to create the database schema:

    ```bash
    npx prisma migrate dev
    ```

6. Seed the database with initial data (optional):

    ```bash
    npx prisma db seed
    ```

## Running the Application

```bash
npm run start
```

The application will be running at `http://localhost:3000`.

## REST APIs

### Register new users

**Endpoint:** `POST /users`

**Request Body:**

```json
{
  "username": "example_user",
  "password": "secure_password"
}
```

### Read balance

**Endpoint:** `GET /wallets/:userId/balance`

### Deposit balance

**Endpoint:** `POST /wallets/:userId/deposit`

**Request Body:**

```json
{
  "amount": 100.0
}
```

### Transfer between wallets

**Endpoint:** `POST /wallets/transfer`

**Request Body:**

```json
{
  "senderId": "sender_user_id",
  "receiverId": "receiver_user_id",
  "amount": 50.0
}
```

### List Top N of transactions by value per user

**Endpoint:** `GET /transactions/top/:userId`

**Query Parameter:**

- `N` (default 10)

### List overall top transacting users by value

**Endpoint:** `GET /transactions/top`

**Query Parameter:**

- `N` (default 10)

## Version Control

This project uses Git for version control. Please refer to the commit history for a detailed evolution of the solution.

Feel free to explore the codebase and make any necessary modifications according to your needs. If you encounter any issues or have questions, please open an issue in the repository.
