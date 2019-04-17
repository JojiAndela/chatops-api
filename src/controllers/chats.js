import model from '../models';
import { hashPassword, checkPassword } from '../helpers/crypter';
import tokener from '../helpers/token';
import { Op } from 'sequelize';
import { multiAdder } from '../helpers/relationAdder';

const { User, Chat, Message, ChatUser } = model;

export default {
  joinChat: async (req, res) => {
    const users = [];
    let oldId = null;
    users.push(req.body.chatWith);
    users.push(req.currentUser.id);

    const prevChat1 = await ChatUser.findAll({ where: { userId: req.currentUser.id }});
    const prevChat2 = await ChatUser.findAll({ where: { userId: req.body.chatWith }});


    if (prevChat1.length && prevChat2.length){
      prevChat1.forEach(item => {
        if(oldId){ return }
        prevChat2.forEach(el => {
          if(oldId){ return }
          console.log('working')
          if (item.chatId === el.chatId){
            oldId = el.chatId;
            console.log('got it');
            return;
          }
        });
      });
    }

    if(oldId){
      const oldChat = await Chat.findByPk(oldId);
      return res.status(200).send({ message: 'chat already exist!', chat: oldChat });
    } else {
      console.log('created');
      const newChat = await Chat.create();
      multiAdder(newChat, users, 'Users');

      return res.status(201).send({ message: 'chat created', chat: newChat });
    }
  },

  getChat: async (req, res) => {
    const { id } = req.params;
    const { currentUser } = req;
    const users = [];
    let belongsHere = false;

    try {
      const reqChat = await Chat.findByPk(id, {
        include: [
          {
            model: User,
            as: 'users'
          },
          {
            model: Message,
            as: 'messages',
            include: [
              {
                model: User,
                as: 'sender'
              }
            ]
          }
        ]
      });

      reqChat.users.map(user => {
        if (user.id === currentUser.id) {
          belongsHere = true;
        } else {
          users.push(user);
        }
      });

      if (!belongsHere) {
        return res.status(403).send({ message: 'You are not permitted to view this chat' });
      }

      const { users: u, ...rest } = reqChat.dataValues;
      res.status(200).send({ chat: { ...rest, users } });
    }
    catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  getAllChat: async (req, res) => {
    const { currentUser } = req;

    try {
      const reqUser = await User.findByPk(currentUser.id, {
        include: [
          {
            model: Chat,
            as: 'chats',
            include: [
              {
                model: User,
                as: 'users'
              }
            ]
          }
        ]
      });

      const chatters = reqUser.dataValues.chats.reduce((acc, val) => {
        const usr = val.users.filter(user => user.id !== currentUser.id);
        const chat = val.dataValues;
        chat.users = usr;
        return chat;
      }, [] );

      const chats = [chatters];
      res.status(200).send({ chats: reqUser.chats });
    } catch (error) {

      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  }
};