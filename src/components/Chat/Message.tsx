import { Timestamp } from 'firebase/firestore';

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

const MessageContainer = ({
  type = 'default',
  children,
}: {
  type: 'default' | 'other';
  children: JSX.Element | string | undefined;
}) => {
  return type === 'default' ? (
    <div className="bg-white w-fit self-end mr-4 mt-2 px-6 py-4 max-w-3/4 border border-gray-3 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl">
      {children}
    </div>
  ) : (
    <div className="bg-primary w-fit self-start ml-4 mt-2 px-6 py-4 max-w-3/4 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl">
      {children}
    </div>
  );
};

export default function Message({ type = 'default', message }: Props) {
  return <MessageContainer type={type}>{message.content}</MessageContainer>;
}
