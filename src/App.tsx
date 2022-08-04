import { Toaster } from 'react-hot-toast';
import Routes from './routes';

function App() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
