import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'PrismaClientValidationError') {
    res.status(400).json({
      success: false,
      message: 'Validation error: ' + err.message,
    });
    return next();
  }
  res.status(500).json({
    success: false,
    message: 'No internet! check your connection and try again',
  });
  return next();
};

export default errorHandler;
