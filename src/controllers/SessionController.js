import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import blackList from './../utils/blackList'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User was not found' });
    }

    if(!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid password'})
    }

    return res.json({
      user: {
        email,
      },
      token: jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  }

  async logOut (req, res) {
    req.user = undefined;
    blackList.addToken(req.headers.authorization);
    req.headers.authorization = undefined;

    res.status(200).json({ 
      status: 'success',
      message: 'User logged out!'
    });
  }
}

export default new SessionController();


