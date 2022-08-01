import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '~/redux/constants/constant';
import { RoomProps } from '~/redux/reducer/RoomReducer';

export default function Room({ room }: { room: RoomProps }) {
  const { selectedRoomId } = useSelector((state: any) => state.RoomReducer);

  const dispatch = useDispatch();
  const handleSelectRoom = () => {
    dispatch({ type: ActionTypes.SET_SELECTED_ROOM, data: room });
  };

  return (
    <div
      className={`hover:bg-light-gray p-4 pl-[10px] flex border-l-[6px] border-white hover:border-l-primary cursor-pointer ${
        selectedRoomId === room.id && 'bg-light-gray border-primary'
      }`}
      onClick={handleSelectRoom}
    >
      <Avatar size="50" maxInitials={1} round color="#a6b2c9" src={room.photoUrl} name={room.name} />
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold">{room.name}</p>
          <p className="text-sm font-normal text-gray-500">Just now</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">{room.lastMessage ? room.lastMessage.content : '...'}</p>
          <p className="text-xs bg-primary px-2 py-1 rounded-full">2</p>
        </div>
      </div>
    </div>
  );
}
