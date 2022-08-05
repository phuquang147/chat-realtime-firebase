import Room from './Room';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypesSaga from '~/redux/constants/constantSaga';
import { useEffect } from 'react';
import { RoomProps } from '~/redux/reducer/RoomReducer';

export default function RoomList() {
  const { rooms } = useSelector((state: any) => state.RoomReducer);
  const { user } = useSelector((state: any) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) dispatch({ type: ActionTypesSaga.GET_ROOM_LIST_SAGA });
  }, [user, dispatch]);

  return (
    <div className="h-full overflow-auto">
      {rooms && rooms.map((room: RoomProps) => <Room key={room.id} room={room} />)}
    </div>
  );
}
