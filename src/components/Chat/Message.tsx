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
  children: JSX.Element | string | undefined;
};

type MessageContentProps = {
  message: MessageProps;
};

const MessageContainer = ({ type = 'default', children }: MessageContainerProps) => {
  return type === 'default' ? (
    <div className="bg-white w-fit self-end mr-4 mt-2 p-4 max-w-3/4 border border-gray-3 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl">
      {children}
    </div>
  ) : (
    <div className="bg-primary w-fit self-start ml-4 mt-2 p-4 max-w-3/4 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">
      {children}
    </div>
  );
};

const MessageContent = ({ message }: MessageContentProps) => {
  const [loaded, setLoaded] = useState(false);

  return message.type && message.type === 'image' ? (
    <>
      {loaded ? null : <img src={loading} alt=""></img>}
      <img src={message.content} alt="" className={`rounded ${loaded || 'none'}`} onLoad={() => setLoaded(true)} />
    </>
  ) : (
    <span>{message.content}</span>
  );
};

export default function Message({ type = 'default', message }: Props) {
  return (
    <MessageContainer type={type}>
      <MessageContent message={message} />
    </MessageContainer>
  );
}
