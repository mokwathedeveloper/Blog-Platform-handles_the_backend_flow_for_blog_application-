# Blog Platform Backend

This project provides the backend for a blog application, built with Node.js, Express.js, and MongoDB. It includes features for user authentication, CRUD operations for blog posts, and a comment system, with role-based permissions.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for implementing JSON Web Tokens (JWT) for authentication.

## Features

- User registration and login with secure password hashing (bcrypt) and JWT authentication.
- CRUD (Create, Read, Update, Delete) operations for blog posts.
- Comment system for blog posts.
- Role-based permissions (Admin and Regular User roles).

## Installation and Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mokwathedeveloper/Blog-Platform-handles_the_backend_flow_for_blog_application-.git
    cd Blog-Platform-handles_the_backend_flow_for_blog_application-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory and add your MongoDB URI and JWT Secret:
    ```
    MONGO_URI="mongodb+srv://mokwastudies:mokwastudies1234@cluster0.eedppla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    JWT_SECRET="your_jwt_secret"
    ```
    *Replace `your_jwt_secret` with a strong, random string.*

4.  **Run the application:**
    ```bash
    node server.js
    ```

    The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## API Documentation

### Authentication

-   **`POST /api/auth/register`**
    -   **Description**: Register a new user.
    -   **Body**: `{ "username": "string", "email": "string", "password": "string", "role": "user" | "admin" }`
    -   **Response**: `{ "message": "User registered successfully" }`

-   **`POST /api/auth/login`**
    -   **Description**: Log in a user and get a JWT token.
    -   **Body**: `{ "email": "string", "password": "string" }`
    -   **Response**: `{ "token": "string" }`

### Blog Posts

-   **`POST /api/blogposts`**
    -   **Description**: Create a new blog post. (Requires authentication)
    -   **Headers**: `Authorization: Bearer <token>`
    -   **Body**: `{ "title": "string", "content": "string" }`
    -   **Response**: `{ "message": "Blog post created successfully", "blogPost": { ... } }`

-   **`GET /api/blogposts`**
    -   **Description**: Get all blog posts.
    -   **Response**: `[ { ...blogPost, author: { username, email } } ]`

-   **`GET /api/blogposts/:id`**
    -   **Description**: Get a single blog post by ID.
    -   **Response**: `{ ...blogPost, author: { username, email } }`

-   **`PUT /api/blogposts/:id`**
    -   **Description**: Update a blog post by ID. (Requires authentication, only author or admin can update)
    -   **Headers**: `Authorization: Bearer <token>`
    -   **Body**: `{ "title": "string", "content": "string" }`
    -   **Response**: `{ "message": "Blog post updated successfully", "blogPost": { ... } }`

-   **`DELETE /api/blogposts/:id`**
    -   **Description**: Delete a blog post by ID. (Requires authentication, only author or admin can delete)
    -   **Headers**: `Authorization: Bearer <token>`
    -   **Response**: `{ "message": "Blog post deleted successfully" }`

### Comments

-   **`POST /api/blogposts/:blogPostId/comments`**
    -   **Description**: Add a comment to a blog post. (Requires authentication)
    -   **Headers**: `Authorization: Bearer <token>`
    -   **Body**: `{ "content": "string" }`
    -   **Response**: `{ "message": "Comment added successfully", "comment": { ... } }`

-   **`GET /api/blogposts/:blogPostId/comments`**
    -   **Description**: Get all comments for a specific blog post.
    -   **Response**: `[ { ...comment, author: { username, email } } ]`

-   **`DELETE /api/blogposts/comments/:id`**
    -   **Description**: Delete a comment by ID. (Requires authentication, only author or admin can delete)
    -   **Headers**: `Authorization: Bearer <token>`
    -   **Response**: `{ "message": "Comment deleted successfully" }`
