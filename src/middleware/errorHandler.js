import createHttpError, { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const isHttp = (typeof isHttpError === 'function' && isHttpError(err)) || Boolean(err && (err.status || err.statusCode));

  if (isHttp) {
    const status = err.status || err.statusCode || 500;
    const payload = {
      name: err.name || 'Error',
      message: err.message || createHttpError(status).message,
    };

    if (process.env.NODE_ENV !== 'production' && err.stack) {
      payload.stack = err.stack;
    }

    return res.status(status).json(payload);
  }

  const generic = { message: 'Internal Server Error' };
  if (process.env.NODE_ENV !== 'production' && err && err.message) {
    generic.debug = err.message;
  }

  return res.status(500).json(generic);
};
