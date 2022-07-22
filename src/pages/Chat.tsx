import React from 'react';
import ChatWindow from '~/components/Chat/ChatWindow';
import RoomDetail from '~/components/Chat/RoomDetail';
import Sidebar from '~/components/Chat/Sidebar';

export default function Chat() {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <ChatWindow />
      <RoomDetail />
    </div>
  );
}
