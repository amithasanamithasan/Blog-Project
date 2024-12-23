# Blogging Platform Backend

This project is a backend system for a blogging platform. It provides functionality for users to write, update, and delete blogs and includes role-based access control with two roles: Admin and User.

## Features

### User Roles
#### Admin
- Manually created in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating a property `isBlocked`.
- **Cannot** update any blog.

#### User
- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- **Cannot** perform admin actions.

### Authentication & Authorization
- **Authentication**: Users must log in to perform write, update, and delete operations.
- **Authorization**: Admin and User roles are differentiated and secured.

### Blog API
- A public API for reading blogs.
- Includes blog title, content, author details, and other necessary information.
- Supports **search**, **sorting**, and **filtering** functionalities.

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone (https://github.com/amithasanamithasan/Blog-Project)
   cd blogging-platform-backend

   API Endpoints
Authentication
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and receive a token.
Blogs
GET /api/blogs - View public blogs with search, sort, and filter functionalities.
POST /api/blogs - Create a new blog (requires login).
PUT /api/blogs/:id - Update a blog (owner only).
DELETE /api/blogs/:id - Delete a blog (owner or admin).
Admin
PUT /api/admin/block-user/:id - Block a user.
DELETE /api/admin/blogs/:id - Delete any blog.
