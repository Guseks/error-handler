# Error Handler

This project is used to practice and gain understanding of how to use middleware to handle errors in Node.js. This is simulated using several routes which includes middleware for handling errors and logging. Below is a guide on how to set up the project and the different routes available.

## Setup Guide

1. **Clone the repository** containing the project to your local machine.

2. **Install dependencies:**. Make sure to have Node.js and npm installed on your machine. Navigate to the root folder of the project and run the following command:

```bash
npm install
```
3. **Start the server**. Once the dependencies have been installed, start the application by running the following command:

```bash
node server.js
```
This will launch the Express server on port 3000 by default.

## Different routes and how to trigger errors
- Method: GET, URL: "http://localhost:3000/" : This route is used to simulate the user wanting to retrieve the list of products but the retrieval of products from the database fails. This causes an error to be thrown which is handled using the error handling middleware. 
- Method: GET, URL: "http://localhost:3000/products" : This route is used to simulate a successful retrieval of products, which return a success message together with the requested products to the client. 
- Method: POST, URL: "http://localhost:3000/login" : This route simulates the user trying to login using a username and password. Using Joi the username and password is validated. If the validating fails a custom AppError is thrown. If the username is unknown, a username with an appropriate message is thrown. Finally if the username matches a user in the system but the password provided is incorrect, an error is thrown with a message indicating "wrong password". 
- The login request is made by inside the body of the request providing a JSON object with the properties of: username and password. These properties are then retrieved from the body and compared to data stored in the application. 

- The custom error is thrown with a custom error message, a custom error code and a status code. These error codes are stored in a separate file and the custom error is defined in its own file. 


