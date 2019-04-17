import { Router } from 'express';
import chats from '../controllers/chats';
import auth from '../middlewares/auth';
import message from './message';

const { joinChat, getChat, getAllChat} =chats;
const route = Router();

route.post('/', auth, joinChat);
route.get('/', auth, getAllChat);
route.get('/:id', auth, getChat);

route.use('/', message);

export default route;