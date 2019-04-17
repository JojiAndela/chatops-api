import express from 'express';
import auth from './auth';
import chat from './chat';
import users from './users';

const app = express();

app.use('/auth', auth);
app.use('/chats', chat);
app.use('/users', users);


export default app;
