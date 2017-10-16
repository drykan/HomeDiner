import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD5XApVRP8PSmNpWAxj42wpNHcx3NKZ6os",
    authDomain: "home-diner.firebaseapp.com",
    databaseURL: "https://home-diner.firebaseio.com",
    projectId: "home-diner",
    storageBucket: "home-diner.appspot.com",
    messagingSenderId: "905110643570"
  };

  const app = firebase.initializeApp(config);
  const base = Rebase.createClass(app.database());
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, base, facebookProvider }
