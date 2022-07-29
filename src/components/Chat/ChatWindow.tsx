import React from 'react';
import { BiSend } from 'react-icons/bi';
import { auth } from '~/firebase/config';
export default function ChatWindow() {
  return (
    <div className="h-screen col-span-6 bg-light-gray flex flex-col">
      <div className="flex items-center p-4">
        <img
          src="https://lh3.googleusercontent.com/a/AItbvmmGGMVJgcaMufhC6Z30Ob5gNGY8GgFj1tVfgAfn=s96-c"
          alt=""
          className="w-10 rounded-full mr-4"
        />
        <p className="text-base font-semibold text-gray-800">Đỗ Phú Quang</p>
      </div>
      <div className="flex-1">chat field</div>
      <div className="flex gap-4 p-4">
        <input
          placeholder="Search"
          className="flex-1 py-4 px-6 bg-white text-gray-600 rounded-full outline-none focus:ring-1 focus:ring-gray-300"
        />
        <button
          className="bg-primary-yellow text-dark-gray text-2xl p-4 rounded-full active:bg-yellow-400"
          onClick={() => {
            auth.signOut();
          }}
        >
          <BiSend />
        </button>
      </div>
    </div>
  );
}
