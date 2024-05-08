export function logger (req, res, next) {
  console.log(`The request path is: ${req.path}`);
  next();
}