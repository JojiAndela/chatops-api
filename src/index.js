import express from 'express';
import route from './routes';
import socket from './socket';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';


dotenv.config();
const app = express();
const httpServer = http.createServer(app);
socket(httpServer, app);

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', route);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to Chatops!' });
});

app.all('*', (req, res) => res.status(404).send({ message: 'Api up and running. Check documentation for appropriate routes' }))

httpServer.listen(port, () => {
  console.log(`Chatops listening on port ${port}!`);
});
