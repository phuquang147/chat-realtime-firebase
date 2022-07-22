import React from 'react';

export default function Room() {
  return (
    <div className="hover:bg-light-gray p-4 pl-[10px] flex border-l-[6px] border-white hover:border-l-primary-yellow cursor-pointer">
      <img
        src="https://lh3.googleusercontent.com/a/AItbvmmGGMVJgcaMufhC6Z30Ob5gNGY8GgFj1tVfgAfn=s96-c"
        alt=""
        className="w-14 rounded-full mr-4"
      />
      <div className="w-full ">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold">Phú Quang</p>
          <p className="text-sm font-normal text-gray-500">Just now</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm">Hello baybe</p>
          <p className="text-xs bg-primary-yellow px-2 py-1 rounded-full">2</p>
        </div>
      </div>
    </div>
  );
}
