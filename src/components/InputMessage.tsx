import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, UploadResult } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import loading from '~/assets/images/loading.svg';
import { db } from '~/firebase/config';
import { RoomProps } from '~/redux/reducer/RoomReducer';
import createMessage from '~/utils/createMessage';

type Props = {
  selectedRoom: RoomProps;
};

export default function InputMessage({ selectedRoom }: Props) {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [image, setImage] = useState('');
  const [imageSnapshot, setImageSnapshot] = useState<UploadResult>();
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('text');
  const [disableSendButton, setDisableSendButton] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.UserReducer);
  const storage = getStorage();
  localStorage.theme = 'dark';
  const newMessage = () => {
    if (message.length > 0) {
      let newMessage;
      if (messageType === 'text') newMessage = createMessage(message, user, messageType);
      else newMessage = createMessage(image, user, messageType);

      db.collection('rooms')
        .doc(selectedRoom.id)
        .collection('messages')
        .add(newMessage)
        .then(() => {
          setMessage('');
          setImage('');
          setMessageType('text');
        });

      db.collection('rooms').doc(selectedRoom.id).update({
        lastMessage: newMessage,
      });

      setEmojiPickerVisible(false);
    }
  };

  const appendEmoji = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleToggleEmoji = () => {
    setEmojiPickerVisible((prev) => !prev);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxImageSize = 1000000;

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= maxImageSize) {
        setImage(loading);
        setDisableSendButton(true);
        const storageRef = ref(storage, `images/${event.target.files[0].name}`);

        uploadBytes(storageRef, event.target.files[0]).then((snapshot: UploadResult) => {
          setMessageType('image');
          setImageSnapshot(snapshot);
          getDownloadURL(snapshot.ref).then((link) => {
            setImage(link);
            setMessage(link);
            setDisableSendButton(false);
          });
        });
      } else toast.error('File size must be less then or equal to 1MB');
    }
  };

  const handleCancelImage = () => {
    if (imageSnapshot)
      deleteObject(imageSnapshot.ref).then(() => {
        setImage('');
        setMessage('');
        setImageSnapshot(undefined);
        setMessageType('text');
      });
  };

  return (
    <div className="flex gap-4 p-4 dark:bg-blue-gray transition-colors duration-300">
      <Popover
        isOpen={emojiPickerVisible}
        positions={['top']}
        content={<Picker data={data} onEmojiSelect={(emoji: any) => appendEmoji(emoji)} theme={localStorage.theme} />}
        align="end"
        padding={10}
        onClickOutside={handleToggleEmoji}
      >
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-light-blue-gray text-gray-600 rounded-full outline-none focus:ring-1 group-hover:ring-gray-300 group">
          {messageType === 'text' ? (
            <>
              <input
                placeholder="Type message..."
                className="flex-1 h-full py-4 px-6 outline-none rounded-full bg-transparent dark:text-gray-100"
                value={message}
                onChange={(e) => setMessage(e.target.value.toString())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') newMessage();
                }}
              />

              <label
                htmlFor="imageMessage"
                className="dark:bg-light-blue-gray hover:bg-primary hover:bg-opacity-50 dark:hover:bg-blue-gray active:bg-primary active:bg-opacity-70 dark:active:bg-dark-blue-gray mr-1 border-3px rounded-full bg-white cursor-pointer"
              >
                <div className="text-2xl p-3 rounded-full dark:text-white">
                  <BsImage />
                </div>
                <input
                  id={`imageMessage`}
                  type="file"
                  className="opacity-0 hidden"
                  accept="image/*"
                  onChange={(e) => onImageChange(e)}
                />
              </label>

              <button
                className="bg-white dark:bg-light-blue-gray dark:text-white hover:bg-primary hover:bg-opacity-50 dark:hover:bg-blue-gray active:bg-primary active:bg-opacity-70 dark:active:bg-dark-blue-gray text-2xl p-3 mr-1 rounded-full"
                onClick={handleToggleEmoji}
              >
                <BsEmojiSmile />
              </button>
            </>
          ) : (
            <div className="flex-1 flex items-center h-full px-6">
              <img src={image} alt="avatar" className="rounded-lg h-12 object-cover" />
              <button className="text-xl ml-2 text-red-500" onClick={handleCancelImage}>
                <AiOutlineCloseCircle />
              </button>
            </div>
          )}
        </div>
      </Popover>

      <button
        disabled={disableSendButton}
        className="bg-primary text-dark-gray text-2xl p-4 rounded-full active:bg-yellow-400"
        onClick={newMessage}
      >
        <BiSend />
      </button>
    </div>
  );
}
