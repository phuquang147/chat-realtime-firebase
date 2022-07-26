import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import firebase, { auth } from '~/firebase/config';
import { addDocument } from '~/firebase/service';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(googleProvider);

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        uid: user?.uid,
        providerId: additionalUserInfo.providerId,
      });
    }
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) navigate('/');
    });

    return unsubscribed;
  }, []);

  return (
    <div className="w-screen h-screen bg-login-bg bg-cover flex justify-center items-center">
      <div className="bg-slate-800 p-10 rounded bg-opacity-90">
        <h1 className="text-white text-4xl leading-9 text-center font-bold">LOGIN</h1>
        <button
          onClick={handleLogin}
          className="bg-transparent w-full mt-10 py-2 px-20 rounded text-red-500 outline-none border border-red-500 flex items-center hover:bg-red-200 active:bg-red-400 hover:bg-opacity-10 active:bg-opacity-10"
        >
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
