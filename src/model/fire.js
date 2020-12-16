 import firebase from 'firebase';
 var firebaseConfig = {
    apiKey: "AIzaSyBi9-hWC2azq5SW-aB5kNk5S4WFLb71PUo",
    authDomain: "login-dbd52.firebaseapp.com",
    databaseURL: "https://login-dbd52.firebaseio.com",
    projectId: "login-dbd52",
    storageBucket: "login-dbd52.appspot.com",
    messagingSenderId: "296638734896",
    appId: "1:296638734896:web:276ded0d92ed40c5b183f5"
  };
  
  const fire =firebase.initializeApp(firebaseConfig);
  export default fire ;