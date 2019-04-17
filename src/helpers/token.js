import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default (payload) => jwt.sign(payload, process.env.SECRET, {expiresIn: '31d'});