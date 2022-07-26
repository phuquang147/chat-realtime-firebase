import { fork, all } from 'redux-saga/effects';
import * as UserSaga from './UserSaga';
import * as RoomSaga from './RoomSaga';

export default function* rootSaga() {
  yield fork(UserSaga.userLoginListener);
  yield fork(UserSaga.userListListener);
  yield all([RoomSaga.followForkRoomListListener()]);
}
