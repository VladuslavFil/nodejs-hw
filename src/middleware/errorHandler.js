import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const status = isHttpError(err) ? err.status : 500;

  let message;

  if (isHttpError(err)) {
    message = err.message;
  } else {
    message = 'Internal Server Error';
  }

  const payload = {
    message: message,
  };

  return res.status(status).json(payload);
};
