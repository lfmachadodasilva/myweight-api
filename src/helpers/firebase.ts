import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_API_KEY as string)),
  databaseURL: process.env.FIREBASE_PROJECT
});

export default admin;
