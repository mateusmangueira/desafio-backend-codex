import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import bcrypt from 'bcryptjs';

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
      token: jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();


