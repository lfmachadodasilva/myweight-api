import express from 'express';
import { checkIfAuthenticated, currentUser } from './helpers/firebase';
import dotenv from 'dotenv';

// read dotenv file
dotenv.config();

// Create Express server
const app = express();

// Define port to be used
app.set('port', process.env.PORT || 3001);

// Use json
app.use(express.json());

// Use routers
app.get('/test1', (request, response, next) => {
  return response.json({ message: 'Hi!' });
});

app.get('/test2', checkIfAuthenticated, async (request, response, next) => {
  const user = await currentUser(request);
  return response.json({
    buildVersion: process.env.BUILD_VERSION,
    firebaseProject: process.env.FIREBASE_PROJECT,
    uid: user
  });
});

export default app;
