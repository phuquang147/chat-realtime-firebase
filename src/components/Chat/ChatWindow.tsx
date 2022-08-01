import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { db } from '~/firebase/config';
import createMessage from '~/utils/createMessage';
import MessageList from './MessageList';
import Avatar from 'react-avatar';
import Room from './Room';

export default function ChatWindow() {
  const { selectedRoom } = useSelector((state: any) => state.RoomReducer);
  const { user } = useSelector((state: any) => state.UserReducer);
  const [message, setMessage] = useState<string>('');

  const newMessage = () => {
    if (message.length > 0) {
      db.collection('rooms')
        .doc(selectedRoom.id)
        .collection('messages')
        .add(createMessage(message, user))
        .then(() => setMessage(''));

      db.collection('rooms')
        .doc(selectedRoom.id)
        .update({
          lastMessage: createMessage(message, user),
        });
    }
  };

  return selectedRoom ? (
    <div className="h-screen col-span-9 bg-light-gray flex flex-col border-x border-light-gray">
      <div className="flex items-center p-4 bg-white">
        <Avatar size="46" maxInitials={1} round color="#a6b2c9" src={selectedRoom.photoUrl} name={selectedRoom.name} />
        <p className="text-base font-semibold text-gray-800 ml-4">{selectedRoom.name}</p>
      </div>
      <div className="flex-1 overflow-auto">
        <MessageList />
      </div>
      <div className="flex gap-4 p-4">
        <input
          placeholder="Search"
          className="flex-1 py-4 px-6 bg-white text-gray-600 rounded-full outline-none focus:ring-1 focus:ring-gray-300"
          value={message}
          onChange={(e) => setMessage(e.target.value.toString())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') newMessage();
          }}
        />
        <button
          className="bg-primary text-dark-gray text-2xl p-4 rounded-full active:bg-yellow-400"
          onClick={newMessage}
        >
          <BiSend />
        </button>
      </div>
    </div>
  ) : (
    <div className="h-screen col-span-6 bg-light-gray flex flex-col items-center justify-center">
      <AiOutlineMessage className="text-8xl text-gray-300" />
      <p className="text-lg text-gray-400 mt-3">Please select chat room</p>
    </div>
  );
}
