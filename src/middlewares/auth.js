import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import blackList from './../utils/blackList'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  if (blackList.contains(authHeader)) {
    return res.status(403).json({ 
      status: 'fail',
      message: 'The user is no longer logged in!'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};