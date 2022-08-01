import firebase from '~/firebase/config';
import { UserProps } from '~/redux/reducer/UserReducer';

const createMessage = (content: string, user: UserProps) => ({
  content: content,
  authorId: user.uid.toString(),
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
});

export default createMessage;
