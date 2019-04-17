import { Router } from 'express';
import msgCon from '../controllers/messages';
import auth from '../middlewares/auth';

const { sendMessage, getAll} = msgCon;
const route = Router();

route.get('/:id/messages', getAll);
route.post('/:id/messages', auth, sendMessage);

export default route;