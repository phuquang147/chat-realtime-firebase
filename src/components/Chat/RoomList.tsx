import React from 'react';
import Room from './Room';

export default function RoomList() {
  return (
    <div className="">
      <p className="m-4 text-2xl font-semibold text-gray-600">Messages</p>
      <Room />
      <Room />
      <Room />
      <Room />
    </div>
  );
}
