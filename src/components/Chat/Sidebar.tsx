import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '~/firebase/config';
import Popper from '~/HOC/Popper';
import * as ActionTypes from '~/redux/constants/constant';
import NewRoomModal from './NewRoomModal';
import RoomList from './RoomList';

export default function Sidebar() {
  const { user } = useSelector((state: any) => state.UserReducer);
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch({ type: ActionTypes.SHOW_MODAL, children: <NewRoomModal /> });
  };

  const handleToggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <div className="h-screen col-span-3 flex flex-col relative">
      <Tippy
        render={(attrs) => (
          <div {...attrs} className="w-80">
            <Popper>
              <button
                className="w-full py-2 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors duration-200"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </Popper>
          </div>
        )}
        visible={menuVisible}
        interactive
        duration={500}
        inlinePositioning
        placement="bottom"
      >
        <div className="flex items-center p-4 gap-4" tabIndex={-1}>
          <Avatar
            size="46"
            maxInitials={1}
            round
            color="#a6b2c9"
            src={user.photoURL}
            name={user.displayName}
            className="cursor-pointer focus:ring focus:ring-yellow-400"
            onClick={handleToggleMenu}
          />
          <p className="text-base font-semibold text-gray-800">{user.displayName}</p>
        </div>
      </Tippy>

      <input
        placeholder="Search"
        className="mx-4 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
      />
      <p className="m-4 text-2xl font-semibold text-gray-600">Messages</p>

      <RoomList />
      <button
        className="h-20 group relative overflow-hidden border-l-[6px] border-primary flex items-center justify-center"
        onClick={showModal}
      >
        <div className="absolute z-0 top-0 left-0 w-0 h-full flex flex-col justify-center items-center bg-primary opacity-0 group-hover:w-full group-hover:opacity-95 duration-500"></div>
        <p className="absolute font-semibold">New Room</p>
      </button>
    </div>
  );
}
