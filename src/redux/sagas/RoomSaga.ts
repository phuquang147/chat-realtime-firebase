import { eventChannel } from 'redux-saga';
import { fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { db } from '~/firebase/config';
import createMember from '~/utils/createMember';
import * as ActionTypes from '../constants/constant';
import * as ActionTypesSaga from '../constants/constantSaga';
import { MemberProps } from '../reducer/RoomReducer';
import { UserProps } from '../reducer/UserReducer';

type DataProps = {
  user: UserProps;
  userList: UserProps[];
};

function* roomListListener() {
  const data: DataProps = yield select((state: any) => state.UserReducer);
  if (!data.user) return;

  const channel: any = new (eventChannel as any)((emiter: any) => {
    const unsubscribe = db
      .collection('rooms')
      .where('members', 'array-contains', createMember(data.user))
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const documents = snapshot.docs.map((doc) => {
          const room = doc.data();
          const index = room.members.findIndex((member: MemberProps) => member.id !== data.user.id);
          const user = data.userList.find((user) => user.id === room.members[index].id);

          return {
            ...room,
            name: user?.displayName,
            photoUrl: user?.photoURL,
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
