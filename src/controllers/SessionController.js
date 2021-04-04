import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    return res.json(req.body);
  }
}

export default new SessionController();


