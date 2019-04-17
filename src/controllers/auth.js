import model from '../models';
import { hashPassword, checkPassword } from '../helpers/crypter';
import tokener from '../helpers/token';
import { Op } from 'sequelize';

const { User } = model;

export default {
  signup: (req, res) => {
    const { username, email, password } = req.body;
    
    return User.findOrCreate({
      where: {
        [Op.or]: [
          {
            email
          },
          {
            username
          }
        ]
     },
      defaults: {
        username,
        email,
        password: hashPassword(password)
      }
    }).spread((user, created) => {
      if(!created){
        return res.status(400).send({ message: `User with ${user.email === email ? 'email' : 'username'} already exists!` });
      }
      const token = tokener({ id: user.id, username: user.username, email: user.email });

      const {password: p, ...rest} = user.dataValues;
      return res.status(201).send({ user: rest, token })
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ error })} );
  },

  login: async (req, res) => {
    const { login, password} = req.body;
  try {
    const user = await User.findOne({ where: {
      [Op.or]: [
        {
          email: {[Op.iLike]: login}
        },
        {
          username: {[Op.iLike]: login}
        }
      ]
    }});

    if(!user) return res.status(400).send({ message: 'Invalid Credentials'});

    if(!checkPassword(password, user.password)) return res.status(400).send({ message: 'Invalid Credentials'});

    const token = tokener({ id: user.id, username: user.username, email: user.email });

    const {password: p, ...rest} = user.dataValues;

    return res.status(200).send({ user: rest, token });
  } catch (error) {
    return res.status(500).send({ error })
  }
  }
};