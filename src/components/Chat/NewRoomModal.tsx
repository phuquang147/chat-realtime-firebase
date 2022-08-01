import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import firebase, { db } from '~/firebase/config';
import * as ActionTypes from '~/redux/constants/constant';
import { UserProps } from '~/redux/reducer/UserReducer';
import createMember from '~/utils/createMember';
import GroupChatRoomForm from './GroupChatRoomForm';
import PersonalChatRoomForm from './PersonalChatRoomForm';

export default function NewRoomModal() {
  const { user, userList } = useSelector((state: any) => state.UserReducer);
  const [openTab, setOpenTab] = useState(1);
  const [userInRoom, setUserInRoom] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  const handleChangeUserInRoom = (value: string | undefined) => {
    setUserInRoom(value);
  };

  const handleCancel = () => {
    dispatch({ type: ActionTypes.HIDE_MODAL });
  };

  const handleSubmit = () => {
    if (userInRoom) {
      const selectedUser = userList.find((user: UserProps) => user.id === userInRoom);
      db.collection('rooms').add({
        type: 'personal',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        members: [createMember(user), createMember(selectedUser)],
      });

      dispatch({ type: ActionTypes.HIDE_MODAL });
      toast.success('Added new room successful');
    } else toast.error('Please choose friend to create room');
  };

  return (
    <div>
      <p className="text-2xl font-bold text-center text-gray-700">New Room</p>
      <ul className="grid grid-cols-2 list-none rounded-md text-center text-xs font-bold uppercase bg-light-gray p-1 mt-8">
        <li
          className={`col-span-1 rounded-md cursor-pointer py-4 ${openTab === 1 && 'bg-white shadow'}`}
          onClick={() => {
            setOpenTab(1);
          }}
        >
          Personal
        </li>
        <li
          className={`col-span-1 rounded-md cursor-pointer py-4 ${openTab === 2 && 'bg-white shadow'}`}
          onClick={() => {
            setOpenTab(2);
          }}
        >
          Group
        </li>
      </ul>
      <div className="py-6">
        <div className={openTab === 1 ? 'block' : 'hidden'}>
          <PersonalChatRoomForm handleChange={handleChangeUserInRoom} />
        </div>
        <div className={openTab === 2 ? 'block' : 'hidden'}>
          <GroupChatRoomForm />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="flex-1 p-4 bg-gray-200 rounded" onClick={handleCancel}>
          Cancel
        </button>
        <button className="flex-1 p-4 bg-primary rounded" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
}
