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
      className={`hover:bg-light-gray dark:hover:bg-blue-gray p-4 pl-[10px] flex border-l-[6px] border-white dark:border-dark-blue-gray hover:border-l-primary dark:hover:border-l-primary cursor-pointer ${
        selectedRoomId === room.id && 'bg-light-gray dark:bg-blue-gray border-primary dark:border-primary'
      }`}
      onClick={handleSelectRoom}
    >
      <Avatar size="50" maxInitials={1} round color="#a6b2c9" src={room.photoUrl} name={room.name} />
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold dark:text-gray-200">{room.name}</p>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Just now</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm dark:text-gray-300">
            {room.lastMessage ? (room.lastMessage.type === 'text' ? room.lastMessage.content : 'Photo') : '...'}
          </p>
        </div>
      </div>
    </div>
  );
}
