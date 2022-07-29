import { eventChannel } from 'redux-saga';
import { fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { db } from '~/firebase/config';
import * as ActionTypes from '../constants/constant';
import * as ActionTypesSaga from '../constants/constantSaga';
import { UserProps } from '../reducer/UserReducer';

type DataProps = {
  user: UserProps;
};

function* roomListListener() {
  const data: DataProps = yield select((state: any) => state.UserReducer);
  if (!data.user) return;
  const channel: any = new (eventChannel as any)((emiter: any) => {
    console.log(data.user.uid);
    const unsubscribe = db
      .collection('rooms')
      .orderBy('createdAt')
      .where('members', 'array-contains', data.user.uid)
      .onSnapshot((snapshot) => {
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
    yield put({ type: ActionTypes.GET_ROOMS, data });
  }
}

function* forkRoomListListener() {
  yield fork(roomListListener);
}

export function* followForkRoomListListener() {
  yield takeLatest(ActionTypesSaga.GET_ROOM_LIST_SAGA, forkRoomListListener);
}
