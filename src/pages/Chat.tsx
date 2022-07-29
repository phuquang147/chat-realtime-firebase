import ChatWindow from '~/components/Chat/ChatWindow';
import RoomDetail from '~/components/Chat/RoomDetail';
import Sidebar from '~/components/Chat/Sidebar';
import Modal from '~/HOC/Modal';

export default function Chat() {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <ChatWindow />
      <RoomDetail />
      <Modal />
    </div>
  );
}
