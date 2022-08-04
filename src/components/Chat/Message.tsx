import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import loading from '~/assets/images/loading.svg';
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

type MessageContainerProps = {
  type: 'default' | 'other';
  message: MessageProps;
  children: JSX.Element | string | undefined;
};

type MessageContentProps = {
  message: MessageProps;
  type: 'default' | 'other';
};

const MessageContainer = ({ type = 'default', message, children }: MessageContainerProps) => {
  return type === 'default' ? (
    <div
      className={`bg-white dark:bg-dark-blue-gray dark:text-gray-100 w-fit self-end mr-4 mt-2 max-w-3/4 border border-gray-300 dark:border-gray-500 rounded-l-2xl rounded-tr-2xl ${
        message.type === 'text' ? 'p-4' : 'p-0'
      }`}
    >
      {children}
    </div>
  ) : (
    <div
      className={`bg-primary w-fit self-start ml-4 mt-2 max-w-3/4 rounded-tl-2xl rounded-r-2xl ${
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
