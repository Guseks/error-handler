import { AppError, DataBaseError } from "../CustomErrors.js";

export function errorHandler(err, req, res, next) {
  if(err instanceof AppError ||  DataBaseError) {
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode,
    });
  }
  else {
    res.status(500).send("Something went wrong");
  }
  
}