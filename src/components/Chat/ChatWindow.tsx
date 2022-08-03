import Avatar from 'react-avatar';
import { AiOutlineMessage } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import InputMessage from './InputMessage';
import MessageList from './MessageList';

export default function ChatWindow() {
  const { selectedRoom } = useSelector((state: any) => state.RoomReducer);

  return selectedRoom ? (
    <div className="h-screen col-span-9 bg-light-gray flex flex-col border-x border-light-gray">
      <div className="flex items-center p-4 bg-white">
        <Avatar size="46" maxInitials={1} round color="#a6b2c9" src={selectedRoom.photoUrl} name={selectedRoom.name} />
        <p className="text-base font-semibold text-gray-800 ml-4">{selectedRoom.name}</p>
      </div>
      <div className="flex-1 overflow-auto">
        <MessageList />
      </div>
      <InputMessage selectedRoom={selectedRoom} />
    </div>
  ) : (
    <div className="h-screen col-span-6 bg-light-gray flex flex-col items-center justify-center">
      <AiOutlineMessage className="text-8xl text-gray-300" />
      <p className="text-lg text-gray-400 mt-3">Please select chat room</p>
    </div>
  );
}
