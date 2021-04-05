import User from '../models/User';

class UserController {
  async store(req, res) {
    const {email, name, password } = req.body;
       let user = await User.findOne({email})    
        if(!user) {
            user = await User.create({email, name, password});
        }
        return res.json(user);
    }
}

export default new UserController();