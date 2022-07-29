import React from 'react';
import RoomList from './RoomList';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionTypes from '~/redux/constants/constant';
import NewRoomModal from './NewRoomModal';

export default function Sidebar() {
  const { user } = useSelector((state: any) => state.UserReducer);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch({ type: ActionTypes.SHOW_MODAL, children: <NewRoomModal /> });
  };

  return (
    <div className="h-screen col-span-3 flex flex-col">
      <div className="flex items-center p-4 gap-4">
        <img src={user.photoURL} alt="" className="w-10 rounded-full" />
        <p className="text-base font-semibold text-gray-800">{user.displayName}</p>
      </div>
      <input
        placeholder="Search"
        className="mx-4 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
      />
      <p className="m-4 text-2xl font-semibold text-gray-600">Messages</p>

      <RoomList />
      <button
        className="h-20 group relative overflow-hidden border-l-[6px] border-primary-yellow flex items-center justify-center"
        onClick={showModal}
      >
        <div className="absolute z-0 top-0 left-0 w-0 h-full flex flex-col justify-center items-center bg-primary-yellow opacity-0 group-hover:w-full group-hover:opacity-95 duration-500"></div>
        <p className="absolute">New Room</p>
      </button>
    </div>
  );
}
