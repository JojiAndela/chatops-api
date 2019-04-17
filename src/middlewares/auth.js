import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();


export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      status: 'error',
      message: 'You are currently not logged in',
    });
  }

  try {
    const decoded = await jwt.verify(authorization, process.env.SECRET);
    req.currentUser = decoded;
    return next();
  } 
  catch (error) {
    return res.status(500).send({ status: 'error', message: 'Invalid token'});
  }
}