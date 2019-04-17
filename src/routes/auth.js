import { Router } from 'express';
import auth from '../controllers/auth';

const { signup, login} =auth;
const route = Router();

route.post('/login', login);
route.post('/signup', signup);

export default route;