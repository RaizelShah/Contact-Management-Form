# Contact Management System

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Create a new PostgreSQL database:

```sql
CREATE DATABASE contact_management;
```

2. The table will be automatically created when you start the backend server.

### Backend Setup

1. Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file with your database credentials:

```
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=contact_management
DB_PASSWORD=your_postgres_password
DB_PORT=5432
PORT=5000
```

3. Start the server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Database Schema

```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    job_title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Overview

This is a full-stack Contact Management From built with React, Material UI, and Node.js with PostgreSQL. It allows users to perform CRUD operations on contacts, including sorting, pagination, and error handling.

The key technical decisions include:

1. **Frontend**:

   - Used Material UI components for consistent and responsive design
   - Implemented state management with React hooks
   - Utilized Axios for API calls

2. **Backend**:

   - Chose Node.js with Express for the server
   - Used the `pg` library for PostgreSQL integration
   - Implemented input validation and error handling

3. **Architecture**:
   - Separated concerns with distinct components and services
   - Utilized reusable utility functions
   - Maintained a clean and modular code structure

The application consists of the following main components:

1. **ContactForm**: Allows users to add new contacts with validation.
2. **ContactTable**: Displays a paginated table of contacts with sorting and action buttons.
3. **EditDialog**: Provides a modal dialog for editing contact details.
4. **DeleteDialog**: Presents a confirmation dialog before deleting a contact.

The backend API supports the following operations:

1. **POST /contacts**: Creates a new contact.
2. **GET /contacts**: Retrieves all contacts with pagination and sorting.
3. **PUT /contacts/:id**: Updates an existing contact.
4. **DELETE /contacts/:id**: Removes a contact.

## Database Choice: PostgreSQL

PostgreSQL was selected as the database management system for this Contact Management System for several compelling reasons:

### 1. Data Integrity and ACID Compliance

- PostgreSQL provides robust data integrity through ACID (Atomicity, Consistency, Isolation, Durability) compliance
- Perfect for contact management where data accuracy is crucial
- Prevents data corruption during concurrent operations when multiple users are modifying contact information simultaneously

### 2. Scalability

- Handles large contact databases efficiently
- Excellent performance with complex queries and large datasets
- Built-in support for horizontal scaling if the contact list grows significantly

### 3. Schema Enforcement and Data Validation

- Strong schema enforcement ensures contact data remains consistent
- Data type validation prevents invalid entries
- CHECK constraints can enforce business rules (e.g., email format validation)
- UNIQUE constraints prevent duplicate contact entries

### 4. Advanced Indexing

- B-tree indexing for efficient contact searches
- Full-text search capabilities for contact information
- Multiple index types available for optimizing different query patterns

### 5. Enterprise Features

- Built-in support for complex queries
- Excellent support for transactions
- Role-based access control for future multi-user implementation
- Easy backup and restoration procedures

### 6. SQL Standard Compliance

- Follows SQL standards strictly
- Makes it easier to maintain and modify the codebase
- Familiar to most developers

### 7. Cost-Effective

- Open-source and free to use
- Large community support
- Extensive documentation available

### 8. Future-Proofing

- Easy to extend with additional features:
  - Contact grouping and categorization
  - Contact activity logging
  - Advanced search capabilities
  - Custom fields for contacts
- Support for JSON data types if flexible schema needed in future

## Alternatives Considered

### MongoDB

- While offering flexibility, the rigid structure of contact data makes a relational database more suitable
- ACID compliance is more critical than schema flexibility for contact management

### MySQL

- PostgreSQL offers more advanced features and better standards compliance
- Better handling of concurrent users and connections
- Superior query optimizer for complex queries

### SQLite

- While simpler to set up, lacks the robustness needed for multi-user access
- Limited concurrent access capabilities
- Not suitable for future scaling

## Conclusion

PostgreSQL's combination of robust data integrity, excellent performance, and enterprise features makes it an ideal choice for a Contact Management System. Its ability to handle complex queries efficiently while maintaining data consistency provides a solid foundation for both current requirements and future expansion of the system.
