// firebase.js
import Environment from './environment';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDSPVgWoJPafv3gPXgkyME6Jb_zzLMUZYA',
  authDomain: 'myrestaurants-59e6d.firebaseapp.com',
  databaseURL: 'https://myrestaurants-59e6d.firebaseio.com',
  projectId: 'myrestaurants-59e6d',
  storageBucket: 'myrestaurants-59e6d.appspot.com',
  messagingSenderId: '47086541077',
});

export default firebase;
