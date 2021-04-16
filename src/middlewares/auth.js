import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from './../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if(user.token !== token){
      return res.status(403).json({ 
          status: 'fail',
          message: 'The user is no longer logged in!'
        });
    }

    req.userId = decoded.id;
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};