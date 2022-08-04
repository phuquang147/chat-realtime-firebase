import { useEffect, useState } from 'react';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { auth } from '~/firebase/config';
import Popper from '~/HOC/Popper';
import * as ActionTypes from '~/redux/constants/constant';
import SettingsModal from './SettingsModal';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

export default function SidebarMenu() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<'light' | 'dark' | undefined>(undefined);

  const showSettingsModal = () => {
    dispatch({ type: ActionTypes.SHOW_MODAL, children: <SettingsModal /> });
  };

  const setLightMode = () => {
    setMode('light');
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  };

  const setDarkMode = () => {
    setMode('dark');
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  };

  useEffect(() => {
    setMode(localStorage.theme);
  }, []);

  return (
    <div className="w-80">
      <Popper>
        <div className="">
          {mode === 'dark' ? (
            <button
              className="flex justify-start items-center w-full h-fit p-3 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 dark:hover:bg-blue-gray transition-colors duration-300 dark:text-gray-100"
              onClick={setLightMode}
            >
              <HiOutlineSun className="text-lg mr-4" />
              Light Mode
            </button>
          ) : (
            <button
              className="flex justify-start items-center w-full h-fit p-3 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 dark:hover:bg-blue-gray transition-colors duration-300 dark:text-gray-100"
              onClick={setDarkMode}
            >
              <HiOutlineMoon className="text-lg mr-4" />
              Dark Mode
            </button>
          )}

          <button
            className="flex justify-start items-center w-full h-fit p-3 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 dark:hover:bg-blue-gray transition-colors duration-300 dark:text-gray-100"
            onClick={showSettingsModal}
          >
            <FiSettings className="text-lg mr-4" />
            Settings
          </button>
          <button
            className="flex justify-start items-center w-full h-fit p-3 rounded text-gray-700 font-bold text-sm hover:bg-gray-100 dark:hover:bg-blue-gray transition-colors duration-300 dark:text-gray-100"
            onClick={() => auth.signOut()}
          >
            <FiLogOut className="text-lg mr-4" />
            Sign Out
          </button>
        </div>
      </Popper>
    </div>
  );
}
