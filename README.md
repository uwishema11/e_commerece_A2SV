# 🛍️ E-Commerce Backend API

A robust and scalable **E-Commerce Backend API** built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**, designed to handle user authentication, product management, and order processing with best development practices.

## Project Overview

This project serves as the backend for an e-commerce platform, enabling users to:

- Browse available products
- Manage their own products (create, update, delete)
- Place and track orders
- Handle authentication and authorization securely

The system integrates caching using **Redis**, file uploads via **Cloudinary**, and ensures smooth database interaction with **Prisma ORM**.

## 🛠 Technologies Used

- **Node.js** – Runtime environment for building fast and scalable APIs
- **Express.js** – Lightweight and flexible web framework
- **TypeScript** – Type-safe JavaScript for cleaner and more reliable code
- **PostgreSQL** – Relational database for structured data storage
- **Prisma ORM** – Simplified and type-safe database interaction
- **Redis** – Used for caching product data to improve performance
- **Cloudinary + Multer** – For image uploads and media storage
- **Joi / Celebrate** – Request validation for data consistency
- **ESLint + Prettier** – Code formatting and linting for maintainability

## 📋 Prerequisites

Make sure you have the following:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- A [PostgreSQL](https://www.postgresql.org/) database
- A [Cloudinary](https://cloudinary.com/) account
- A [Redis Cloud](https://redis.com/try-free/) instance

## 🚀 Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/uwishema11/e_commerece_A2SV.git
   cd e_commerece_A2SV
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the project root with the following contents:

   ```env
   DATABASE_URL=postgresql://user:password@host:port/dbname
   JWT_SECRET=your_jwt_secret_key
   REDIS_URL=redis://default:password@host:port
   REDIS_PWD=your_redis_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

   ```

## Run Database Migrations

- npx prisma migrate dev

## Start The Server

- npm run dev

## Why These Technologies

| Technology        | Reason                                              |
| :---------------- | :-------------------------------------------------- |
| Node.js & Express | Fast, lightweight, and widely used for RESTful APIs |
| Typescript        | Adds strong typing, improving code reliability      |
| Prisma            | Developer-friendly ORM with type safety             |
| Postgres          | Reliable and scalable relational database           |
| Redis             | Enhances performance with caching                   |
| Cloudinary        | Simplifies file upload and image management         |

## ✨ Key Features

- **🔑 Authentication**
  - Secure user registration and login using JWT
  - Protected routes with role-based access
- **🛒 Product Management**
  - Create, update, and delete products
  - View product listings with pagination, search, and filtering
  - Upload product images via Cloudinary
  - Redis caching for fast retrieval
- **📦 Order Management**
  - Place orders directly
  - Validate stock availability
  - Full transaction safety (rollback if failure occurs)

## 📞 Contact

[Celine Uwishema] - [uwishemaceline4@gmail.com]  
Project Link: [https://github.com/uwishema11/e_commerece_A2SV]

🌐 GitHub Profile: [https://github.com/uwishema11]
