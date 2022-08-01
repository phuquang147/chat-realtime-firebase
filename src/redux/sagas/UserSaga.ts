import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import { auth, db } from '~/firebase/config';
import * as ActionTypes from '../constants/constant';

export function* userLoginListener() {
  const channel: any = new (eventChannel as any)((emiter: any) => {
    const unsubscibe: any = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        emiter({
          data: {
            displayName,
            email,
            uid,
            photoURL,
          },
        });
      } else {
        emiter({});
      }
    });

    return unsubscibe;
  });

  while (true) {
    const { data } = yield take(channel);
    yield put({
      type: ActionTypes.GET_USER,
      data: data,
    });
  }
}

export function* userListListener() {
  const channel = new (eventChannel as any)((emiter: any) => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      emiter({ data: documents });
    });

    return unsubscribe;
  });

  while (true) {
    const { data } = yield take(channel);

    yield put({ type: ActionTypes.GET_USER_LIST, data: data });
  }
}
