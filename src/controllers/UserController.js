import User from '../models/User';

class UserController {
  async store(req, res) {
    const {email, name, password } = req.body;
    try {
      if (await User.findOne({ email }))

        return res.status(400).send({ error: 'User already exists'});

      const user = await User.create({email, name, password});

      return res.send(user);
    } catch (error) {
      return res.status(400).send({error: 'Registration failed'})
    }
  }
}

export default new UserController();