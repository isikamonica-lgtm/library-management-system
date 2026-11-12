# Library Management System

## Project Overview

The Library Management System is a backend application developed using NestJS, Prisma ORM and PostgreSQL.

The system provides a structured data foundation for managing library users, books, genres and book reviews.

## Technology Stack

- Node.js
- NestJS
- TypeScript
- Prisma ORM 7
- PostgreSQL
- Supabase

## Database Models

### User

Stores registered library users, including their names, email addresses and roles.

### Genre

Stores book categories such as Fiction, Science, Technology and History.

### Book

Stores book information, including title, author, ISBN, publication year and available copy counts.

### Review

Stores reviews written by users about books, including ratings and optional comments.

## Schema Decisions

The Book model references the Genre model through a foreign key called `genreId`.

This design creates a one-to-many relationship between Genre and Book. One genre can contain many books, while each book belongs to one genre.

Using a separate Genre model avoids repeating genre information in every book record. It also improves data consistency because genre information is maintained in one place.

The User model uses a Role enum to distinguish between PATRON and LIBRARIAN users.

The Review model connects User and Book through foreign keys. This allows users to review books while maintaining relational integrity.

## Database Setup

1. Install dependencies:

   `npm install`

2. Create a PostgreSQL database using Supabase.

3. Create an `.env` file using `.env.example` as a guide.

4. Configure the database connection strings.

5. Validate the Prisma schema:

   `npx prisma validate`

6. Apply database migrations:

   `npx prisma migrate dev --name init`

## Database Seeding

The seed file is located at:

`api/prisma/seed.ts`

It creates at least four genres and fifteen books.

Run the seed using:

`npx tsx prisma/seed.ts`

## Running the Application

From the api directory:

`npm run start:dev`

The NestJS development server starts and watches for code changes.

## Project Structure

- `api/prisma/schema.prisma` – Database schema.
- `api/prisma/seed.ts` – Database seed data.
- `api/src/prisma/prisma.service.ts` – Prisma database service.
- `api/src/prisma/prisma.module.ts` – Prisma module.
- `api/prisma7.config.ts` – Prisma configuration.
- `api/.env.example` – Environment variable template.

## Future Improvements

- Book borrowing and returning functionality.
- User authentication and authorization.
- Book search and filtering.
- Review rating validation.
- Library inventory management.
