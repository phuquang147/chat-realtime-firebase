import ChatWindow from '~/components/ChatWindow';
import RoomDetail from '~/components/RoomDetail';
import Sidebar from '~/components/Sidebar';
import Modal from '~/HOC/Modal';

export default function Chat() {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <ChatWindow />
      {/* <RoomDetail /> */}
      <Modal />
    </div>
  );
}
