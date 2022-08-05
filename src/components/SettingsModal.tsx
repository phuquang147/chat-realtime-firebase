import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '~/firebase/config';
import * as ActionTypes from '~/redux/constants/constant';
import loading from '~/assets/images/loading.svg';
export default function SettingsModal() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.UserReducer);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const storage = getStorage();

  const handleCancel = () => {
    dispatch({ type: ActionTypes.HIDE_MODAL });
  };

  const handleSubmit = () => {
    db.collection('users')
      .doc(user.id)
      .update({
        photoURL: avatar,
        displayName: name,
      })
      .then(() => {
        toast.success('Update information successful');
      });
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxImageSize = 1000000;

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= maxImageSize) {
        setAvatar(loading);
        const storageRef = ref(storage, `images/${event.target.files[0].name}`);

        uploadBytes(storageRef, event.target.files[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((link) => {
            setAvatar(link);
          });
        });
      } else toast.error('File size must be less then or equal to 1MB');
    }
  };

  useEffect(() => {
    if (user) {
      setAvatar(user.photoURL);
      setName(user.displayName);
    }
  }, [user]);

  return (
    <div>
      <p className="text-2xl font-bold text-center text-gray-700 dark:text-gray-100">Settings</p>
      <div className="w-full relative flex justify-center mt-10">
        <label
          htmlFor="avatarSetting"
          className="w-20 h-20 border-3px rounded-full p-2px mr-2 bg-white border-dashed hover:bg-transparent hover:border-primary cursor-pointer"
        >
          <img src={avatar} alt="avatar" className="rounded-full w-full h-full object-cover ring-2 ring-primary" />
          <input
            id={`avatarSetting`}
            type="file"
            className="opacity-0 hidden"
            accept="image/*"
            onChange={(e) => onImageChange(e)}
          />
        </label>
      </div>
      <p className="mt-4 dark:text-gray-100">Name</p>
      <input
        className="w-full mt-2 mb-8 p-4 bg-light-gray dark:bg-light-blue-gray text-gray-600 dark:text-gray-100 rounded-xl outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 p-4 bg-gray-200 dark:bg-dark-blue-gray dark:text-gray-100 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="flex-1 p-4 bg-primary rounded" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
}
