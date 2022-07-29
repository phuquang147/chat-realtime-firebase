import firebase, { db } from './config';
import { collection, addDoc } from 'firebase/firestore';

export const addDocument = async (col: string, data: any) => {
  await addDoc(collection(db, col), {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
