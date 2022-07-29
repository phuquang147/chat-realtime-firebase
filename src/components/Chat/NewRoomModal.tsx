import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDocument } from '~/firebase/service';
import * as ActionTypes from '~/redux/constants/constant';
import { toast } from 'react-hot-toast';

export default function NewRoomModal() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useSelector((state: any) => state.UserReducer);

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({ type: ActionTypes.HIDE_MODAL });
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();
    console.log(name, description);
    addDocument('rooms', { name, description, member: [user.uid] });
    dispatch({ type: ActionTypes.HIDE_MODAL });
    toast.success('Added new room successful');
    // if (result) {
    //   dispatch({ type: ActionTypes.HIDE_MODAL });
    // } else {
    //   toast.error('Failed to add new room');
    // }
  };

  return (
    <div>
      <p className="text-2xl font-bold text-center text-gray-700">New Room</p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <p className="mt-4"> Name</p>
        <input
          className="mt-2 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <p className="mt-4">Description</p>
        <input
          className="mt-2 p-4 bg-light-gray text-gray-600 rounded-xl outline-none focus:ring-1 focus:ring-gray-300"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        />
        <div className="flex gap-2 mt-4">
          <button type="button" className="flex-1 p-4 bg-gray-200 rounded" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="flex-1 p-4 bg-primary-yellow rounded">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
