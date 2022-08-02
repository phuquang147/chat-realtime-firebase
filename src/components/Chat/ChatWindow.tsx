import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import Avatar from 'react-avatar';
import { AiOutlineMessage } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { BsEmojiSmile } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import { db } from '~/firebase/config';
import createMessage from '~/utils/createMessage';
import MessageList from './MessageList';

export default function ChatWindow() {
  const { selectedRoom } = useSelector((state: any) => state.RoomReducer);
  const { user } = useSelector((state: any) => state.UserReducer);
  const [message, setMessage] = useState<string>('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

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

    setEmojiPickerVisible(false);
  };

  const appendEmoji = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleToggleEmoji = () => {
    setEmojiPickerVisible((prev) => !prev);
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
        <Popover
          isOpen={emojiPickerVisible}
          positions={['top']}
          content={<Picker data={data} onEmojiSelect={(emoji: any) => appendEmoji(emoji)} theme="light" />}
          align="end"
          padding={10}
          onClickOutside={handleToggleEmoji}
        >
          <div className="flex-1 flex items-center justify-center bg-white text-gray-600 rounded-full outline-none focus:ring-1 group-hover:ring-gray-300 group">
            <input
              placeholder="Search"
              className="flex-1 h-full py-4 px-6 outline-none rounded-full"
              value={message}
              onChange={(e) => setMessage(e.target.value.toString())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') newMessage();
              }}
            />
            <button
              className="bg-white hover:bg-primary hover:bg-opacity-50 active:bg-primary active:bg-opacity-70 text-2xl p-3 mr-1 rounded-full"
              onClick={handleToggleEmoji}
            >
              <BsEmojiSmile />
            </button>
          </div>
        </Popover>

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
