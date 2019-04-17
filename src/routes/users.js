import { Router } from 'express';
import users from '../controllers/users';
import auth from '../middlewares/auth';
const { allUsers} = users;
const route = Router();

route.get('/', auth, allUsers);

export default route;