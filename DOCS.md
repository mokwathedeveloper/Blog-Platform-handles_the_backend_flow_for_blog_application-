# Project Setup and Usage Instructions

This document provides instructions on how to set up and run the Blog Platform backend.

## 1. Install Dependencies

To get started, you need to install all the necessary Node.js dependencies. Navigate to the project's root directory in your terminal and run:

```bash
npm install
```

This command will install all packages listed in `package.json`, including `express`, `mongoose`, and `dotenv`.

## 2. Run the Server in Development Mode

For development, `nodemon` is configured to automatically restart the server whenever file changes are detected.

To start the server in development mode, use the `dev` script:

```bash
npm run dev
```

You should see output similar to this:
```
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
✅ MongoDB is connected successfully...
✅ Server is running on port 5000
```

## 3. Configure MongoDB Connection

The application connects to a MongoDB database. The connection string is loaded from the `.env` file.

1.  **Create a `.env` file:** In the root directory of the project, create a file named `.env`.
2.  **Add your MongoDB URI:** Open the `.env` file and add your MongoDB connection string. Replace `your_mongodb_connection_string` with your actual MongoDB URI.

    ```
    PORT=5000
    MONGO_URI="your_mongodb_connection_string"
    ```

    Example:
    ```
    MONGO_URI="mongodb+srv://username:password@cluster0.xxxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ```

    Ensure your MongoDB connection string is correct to avoid connection errors.
