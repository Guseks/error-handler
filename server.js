import express from 'express';
import Joi from 'joi';
import { tryCatch } from './utils/tryCatch.js';
import { AppError, DataBaseError } from './CustomErrors.js';
import { UNAUTHORIZED_USER, LOGIN_CREDENTIALS_NOT_PROVIDED, WRONG_LOGIN_CREDENTIALS, DATABASE_ERROR } from './constants/errorCodes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const app = express();

// Users in App, stored in a Database
const users = [
  { name: 'Gustaf', 
    password: "test"
  }, 
  { name: 'John',
    password: "test2"
  }
];

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
})

function getProducts() {
  return [{ name: 'Product 1' }, { name: 'Product 2' }];
}

function getProductsFailed() {
  return undefined;
}

app.use(express.json());

app.use(logger);
app.get('/', tryCatch(async (req, res) => {
  const products = getProductsFailed();
  if (!products) {
    throw new DataBaseError("Database error", DATABASE_ERROR, 500);
  }
  
  res.status(200).send('Products sent successfully');
}));

app.get('/products', tryCatch(async (req, res) => {
  const products = getProducts();
  if (!products) {
    throw new DataBaseError("Database error", DATABASE_ERROR, 500);
  }
  
  res.status(200).json({
    message: 'Products sent successfully',
    products: products,
  });
}));


app.post("/login", (req, res) => {
  console.log(req.body);
  const {error} = loginSchema.validate(req.body);
  if(error){
    throw new AppError(`${error.message.replace(/\"/g, '')}`, LOGIN_CREDENTIALS_NOT_PROVIDED, 400);
  }
  const userName = req.body.username;
  const password = req.body.password;
  const userFound = users.find(user => user.name === userName);
  if (!userFound) {
    throw new AppError(`User with username ${userName} not found, Access denied!`, UNAUTHORIZED_USER, 401);
  } else {
    if (userFound.password ===  password) {
      res.status(200).send('Login successful');
    } else {
      throw new AppError('Wrong password', WRONG_LOGIN_CREDENTIALS, 401);
    }
  }
})

app.use(errorHandler);

app.listen(3000, () => {
  console.log('listening on port 3000!');
});