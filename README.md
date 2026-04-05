# Finance Dashboard Backend

## Overview

This project is a backend system for a finance dashboard that allows users to manage financial records based on role-based access control (RBAC).

The system supports:

* User management
* Financial record management
* Role-based access control
* Dashboard analytics

The backend is designed to be clean, modular, and suitable for frontend dashboard integration.

---

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQLite
* JWT Authentication
* Swagger (API Documentation)
* Express Rate Limiting

---

## Features

### Authentication

* User registration
* User login using JWT
* Secure token-based access

---

### Role-Based Access Control (RBAC)

| Role    | Permissions                    |
| ------- | ------------------------------ |
| Viewer  | Can view dashboard data        |
| Analyst | Can view records and analytics |
| Admin   | Full access (users + records)  |

RBAC is implemented using middleware and enforced at route level.

---

### User Management

* Create users (Admin only)
* Get all users
* Update users
* Delete users
* User status management (ACTIVE / INACTIVE)

---

### Financial Records

Each record includes:

* Amount
* Type (INCOME / EXPENSE)
* Category
* Date
* Notes

#### Supported Operations:

* Create record
* View records
* Update record
* Soft delete record
* Pagination
* Filtering (type, category)
* Search (category, notes)
* Date range filtering

---

### Dashboard APIs

Provides aggregated insights:

* Total income
* Total expenses
* Net balance
* Category-wise breakdown
* Recent activity
* Monthly trends
* Weekly trends

---

### Security

* JWT Authentication implemented
* Role-Based Access Control (RBAC)
* 401 Unauthorized for invalid or missing tokens
* 403 Forbidden for restricted actions
* Rate limiting to prevent abuse

---

### Validation & Error Handling

* Input validation for critical fields
* Meaningful error messages
* Proper HTTP status codes:

  * 400 → Bad Request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 500 → Server Error
* Central error handler implemented

---

### Data Persistence

* SQLite database used for simplicity
* Prisma ORM for schema and queries
* Relational mapping between users and financial records

---

## Setup Instructions

### 1. Clone the repository

git clone <your-repo-link>
cd finance-dashboard-backend

---

### 2. Install dependencies

`npm install`

---

### 3. Setup database

`npx prisma migrate dev`

---

### 4. Start the server

`node src/app.js`

---

Server runs at:
http://localhost:3000

---

## Authentication Flow

### 1. Register

POST /auth/register

### 2. Login

POST /auth/login

Response:

{
"token": "your_jwt_token"
}

---

### 3. Use token

Add header in requests:

Authorization: Bearer <token>

---

## API Endpoints

### Auth

* POST /auth/register
* POST /auth/login

---

### Users (Admin only)

* POST /users
* GET /users
* PATCH /users/:id
* DELETE /users/:id

---

### Records

* POST /records
* GET /records
* PATCH /records/:id
* DELETE /records/:id

---

### Dashboard

* GET /dashboard/summary
* GET /dashboard/categories
* GET /dashboard/trends
* GET /dashboard/recent

---

## Filtering & Search Examples

Filter by type:
/records?type=INCOME

Search:
/records?search=food

Date range:
/records?startDate=2025-01-01&endDate=2025-03-01

---

## API Documentation

Swagger UI available at:
http://localhost:3000/docs

---

## Deployment

Backend deployed on Render:
https://finance-dashboard-backend-lc8v.onrender.com

---

## Assumptions

* SQLite used for simplicity (as per assignment scope)
* Basic validation implemented without external libraries
* System designed for demonstration, not production scale

---

## Future Improvements

* Add Joi/Zod validation
* Implement unit/integration tests
* Use PostgreSQL for production
* Add advanced filtering & sorting
* Improve logging system

---

## Conclusion

This project demonstrates:

* Backend system design
* Role-based access control
* Data modeling and persistence
* API design and aggregation logic

The implementation focuses on clarity, correctness, and maintainability.