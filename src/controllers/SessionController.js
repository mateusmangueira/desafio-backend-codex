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
<<<<<<< HEAD
=======

  async logout (req, res) {
    req.user = undefined;
    blackList.addToken(req.headers.authorization);
    req.headers.authorization = undefined;

    res.status(200).json({ 
      status: 'success',
      message: 'User logged out!'
    });
  }
}
>>>>>>> b7c3f4e4186c56311fdde44a687ac5146cce0bfd

  //Rota teste de logout, nao sei como fazer... nunca usei logout pelo backend(smp foi pelo frontend)
  async logout(req, res) {
    const id = req.userId;
    const user = await User.findByIdAndUpdate(id, {
      user: {
        isAuthenticated: false,
      }
    })
    return res.send(user)
  }
}
export default new SessionController();


