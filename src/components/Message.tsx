import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Popover } from 'react-tiny-popover';
import loading from '~/assets/images/loading.svg';
import { db } from '~/firebase/config';
import Popper from '~/HOC/Popper';
import { useSelector } from 'react-redux';

export interface MessageProps {
  id: string;
  content?: string;
  authorId?: string;
  createdAt?: Timestamp;
  type?: 'text' | 'image' | 'file';
}

type Props = {
  type?: 'default' | 'other';
  message: MessageProps;
};

type MessageMenuProps = {
  message: MessageProps;
};

type MessageContainerProps = {
  type: 'default' | 'other';
  message: MessageProps;
  children: JSX.Element | string | undefined;
};

type MessageContentProps = {
  message: MessageProps;
  type: 'default' | 'other';
};

const MessageMenu = ({ message }: MessageMenuProps) => {
  const { selectedRoom } = useSelector((state: any) => state.RoomReducer);

  const deleteMessage = () => {
    db.collection('rooms').doc(selectedRoom.id).collection('messages').doc(message.id).delete();
  };

  return (
    <Popper>
      <div className="">
        <button
          className="flex justify-start items-center w-full h-fit py-3 px-10 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 dark:hover:bg-blue-gray transition-colors duration-300 dark:text-gray-100"
          onClick={deleteMessage}
        >
          Remove
        </button>
      </div>
    </Popper>
  );
};

const MessageContainer = ({ type = 'default', message, children }: MessageContainerProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return type === 'default' ? (
    <div className="flex-1 flex justify-end items-center mr-4 mt-4 group">
      <Popover
        isOpen={menuVisible}
        positions={['left']}
        content={<MessageMenu message={message} />}
        align="center"
        padding={10}
        onClickOutside={handleToggleMenu}
      >
        <div>
          <button
            className={`group-hover:inline-block text-xl p-2 mr-2 rounded-full dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-blue-gray active:bg-gray-300 ${
              menuVisible ? 'inline-block' : 'hidden'
            }`}
            onClick={handleToggleMenu}
          >
            <BsThreeDots />
          </button>
        </div>
      </Popover>
      <div
        className={`inline-block bg-white dark:bg-dark-blue-gray dark:text-gray-100 w-fit max-w-3/4 border border-gray-300 dark:border-gray-500 rounded-l-2xl rounded-tr-2xl ${
          message.type === 'text' ? 'p-4' : 'p-0'
        }`}
      >
        {children}
      </div>
    </div>
  ) : (
    <div
      className={`bg-primary w-fit self-start max-w-3/4 ml-4 mt-4 rounded-tl-2xl rounded-r-2xl ${
        message.type === 'text' ? 'p-4' : 'p-0'
      }`}
    >
      {children}
    </div>
  );
};

const MessageContent = ({ message, type = 'default' }: MessageContentProps) => {
  const [loaded, setLoaded] = useState(false);

  return message.type && message.type === 'image' ? (
    <>
      {loaded ? null : <img src={loading} alt=""></img>}
      <img
        src={message.content}
        alt=""
        className={`${loaded || 'none'} ${
          type === 'default' ? 'rounded-l-2xl rounded-tr-2xl ' : 'rounded-tl-2xl rounded-r-2xl'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </>
  ) : (
    <span>{message.content}</span>
  );
};

export default function Message({ type = 'default', message }: Props) {
  return (
    <MessageContainer message={message} type={type}>
      <MessageContent message={message} type={type} />
    </MessageContainer>
  );
}
