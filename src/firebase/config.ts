import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB7aX36Hr6aZvGNqcAzf0FHXNYkHEy8brQ',
  authDomain: 'chat-app-933a8.firebaseapp.com',
  databaseURL: 'https://chat-app-933a8-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-933a8',
  storageBucket: 'chat-app-933a8.appspot.com',
  messagingSenderId: '729655284904',
  appId: '1:729655284904:web:a8f71aacb0d3676bc71e9d',
  measurementId: 'G-P3YVQDSCTT',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
export default firebase;
