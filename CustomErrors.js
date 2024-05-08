export class AppError extends Error {
  constructor(message, errorCode, statusCode){
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class DataBaseError extends Error {
  constructor(message, errorCode, statusCode){
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}