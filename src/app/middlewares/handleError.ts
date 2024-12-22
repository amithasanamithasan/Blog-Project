import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const handleError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorDetails = {};

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errorDetails = err.errors;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation error';
    errorDetails = err.errors;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data type';
    errorDetails = err;
  } else {
    errorDetails = err;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorDetails,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default handleError;
