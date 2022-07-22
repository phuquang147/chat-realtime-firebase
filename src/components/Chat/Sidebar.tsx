import React from 'react';
import RoomList from './RoomList';

export default function Sidebar() {
  return (
    <div className="col-span-3 flex flex-col">
      <div className="flex items-center p-4 gap-4">
        <img
          src="https://lh3.googleusercontent.com/a/AItbvmmGGMVJgcaMufhC6Z30Ob5gNGY8GgFj1tVfgAfn=s96-c"
          alt=""
          className="w-10 rounded-full"
        />
        <p className="text-base font-semibold text-gray-800">Đỗ Phú Quang</p>
      </div>
      <input
        placeholder="Search"
        className="mx-4 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
      />
      <RoomList />
    </div>
  );
}
