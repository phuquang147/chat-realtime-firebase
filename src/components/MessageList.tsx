import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '~/firebase/config';
import Message from './Message';
import { MessageProps } from './Message';
// import * as ActionTypes from '~/redux/constants/constant';

export default function MessageList() {
  const { user } = useSelector((state: any) => state.UserReducer);
  const { selectedRoom } = useSelector((state: any) => state.RoomReducer);
  // const dispatch = useDispatch();
  const [messages, setMessages] = useState<Array<MessageProps>>([]);

  useEffect(() => {
    let unsubscribeMessage = () => {};
    // let unsubscribeRoom = () => {};

    if (selectedRoom) {
      unsubscribeMessage = db
        .collection('rooms')
        .doc(selectedRoom.id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const messages: MessageProps[] = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setMessages(messages);
        });

      // unsubscribeRoom = db
      //   .collection('rooms')
      //   .doc(selectedRoom.id)
      //   .onSnapshot((snapshot) => {
      //     dispatch({ type: ActionTypes.SET_SELECTED_ROOM, data: { ...snapshot.data, id: snapshot.id } });
      //   });
    }

    return () => {
      unsubscribeMessage();
      // unsubscribeRoom();
    };
  }, [selectedRoom]);

  return (
    <div className="h-full w-full flex flex-col-reverse overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} type={message.authorId !== user.uid ? 'other' : 'default'} />
      ))}
    </div>
  );
}
