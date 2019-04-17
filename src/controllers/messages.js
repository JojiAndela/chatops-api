import model from '../models';

const { Message, ChatUser, User } = model;

export default {
  sendMessage: async (req, res) => {
    const { msg } = req.body;
    const { currentUser, params } = req;
    const message = await Message.create({
      msg,
      senderId: currentUser.id,
      chatId: params.id,
    }, {
      include: [
        {
          model: User,
          as: 'sender'
        }
      ]
    });
    res.status(200).send({ message });
  },

  getAll: (req, res) => Message.findAll().then((messages) => res.send({ messages })),

};