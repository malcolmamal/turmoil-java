import jwt from 'jsonwebtoken';

export const isAuthorized = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('No token');

    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'turmoil-secret-key');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authorized');

    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.id;
  console.log('decoded email', decodedToken.email);

  next();
};
