# Finance Dashboard Backend

## Overview
This project is a backend system for a finance dashboard. It supports user management, financial records, role-based access control (RBAC), and analytics APIs for dashboard insights.

---

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT Authentication
- Swagger (API Documentation)

---

## Features

### Authentication
- User registration
- User login using JWT

### Role-Based Access Control
- Viewer → Can view dashboard only
- Analyst → Can view records and analytics
- Admin → Full access (users + records)

### Financial Records
- Create, Read, Update, Delete (Soft Delete)
- Filter by type and category
- Pagination support

### Dashboard APIs
- Total income and expenses
- Net balance
- Category-wise breakdown
- Monthly trends
- Recent activity

---

## Setup Instructions

1. Install dependencies:
   npm install

2. Run database migration:
   npx prisma migrate dev

3. Start the server:
   node src/app.js

Server runs at:
http://localhost:3000

---

## Authentication Flow

1. Register a user:
   POST /auth/register

2. Login:
   POST /auth/login

3. Copy token from response and use in headers:
   Authorization: Bearer <token>

---

## Security

- JWT Authentication implemented
- Role-Based Access Control (RBAC)
- 401 Unauthorized for invalid or missing tokens
- 403 Forbidden for restricted actions

---

## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

### Users (Admin only)
- POST /users
- GET /users
- PATCH /users/:id
- DELETE /users/:id

### Records
- POST /records
- GET /records
- PATCH /records/:id
- DELETE /records/:id

### Dashboard
- GET /dashboard/summary
- GET /dashboard/categories
- GET /dashboard/trends
- GET /dashboard/recent

---

## API Documentation

Swagger UI available at:
http://localhost:3000/docs

---

## Assumptions
- Single-user system
- SQLite used for simplicity
- JWT used for authentication

---

## Future Improvements
- Add rate limiting
- Add unit tests
- Use PostgreSQL for production
- Improve validation using libraries like Joi or Zod