import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User was not found' });
    }

    if(!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid password'})
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    
    await User.findByIdAndUpdate(user.id, { token });

    return res.json({
      user: {
        email,
      },
      token
    });
  }

  async logout (req, res) {

    await User.findByIdAndUpdate(req.body.user, { token: null });

    res.status(200).json({ 
      status: 'success',
      message: 'User logged out!'
    });
  }
}

export default new SessionController();


