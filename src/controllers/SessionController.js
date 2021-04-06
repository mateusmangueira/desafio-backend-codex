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


