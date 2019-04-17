import model from '../models';
import { Op } from 'sequelize';

const { Message, ChatUser, User } = model;

export default {
  allUsers: async (req, res) => {
    const users = await User.findAll({
      where: {
        [Op.not]: {
          id: req.currentUser.id
        }
      }
    });

    res.status(200).send({ users });
  }
};