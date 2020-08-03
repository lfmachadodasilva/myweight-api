import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

var serviceAccount =
  (process.env.FIREBASE_API_KEY && JSON.parse(process.env.FIREBASE_API_KEY as string)) ||
  require('../../util/firebase.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_PROJECT
});

export default admin;

const getAuthToken = (req: any, res: any, next: any) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated = (req: any, res: any, next: any) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res.status(401).send({ error: 'You are not authorized to make this request' });
    }
  });
};

export const currentUser = async (req: any): Promise<admin.auth.UserRecord> => {
  return await admin.auth().getUser(req.authId);
};
