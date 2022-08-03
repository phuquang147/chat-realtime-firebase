import firebase from '~/firebase/config';
import { UserProps } from '~/redux/reducer/UserReducer';

const createMessage = (content: string, user: UserProps, type: string) => ({
  content: content,
  authorId: user.uid.toString(),
  type: type,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
});

export default createMessage;
