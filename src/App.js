import React, { useState , useEffect } from "react" ;
import './App.css';
import fire from'./model/fire' ;
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Login from './Login';
import Hero from './Hero';

const App = ()=> {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, sethasAccount] = useState(false);
  const [data,setData] = React.useState([])
  const clearInputs =() => {
    setEmail('');
    setPassword('');
  }
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };
   
  const clearErrors =() =>{
    setEmailError('');
    setPasswordError('');
  }
  

  const handleLogin =() =>{
    clearErrors();
    fire 
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch (err=>{
      console.log(err)
      switch(err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":          
          setEmailError(err.message);
          break;
        case "auth/wrong-passeword":
          setPasswordError(err.message);
          break;
          default : setPasswordError('wrong password')
      }
    });

  };
  const handleSignup =() =>{
    clearErrors();
    fire
    .auth()   
    .createUserWithEmailAndPassword(email,password).then(async _usr=>{
      
      const utilisateur = {
        id:_usr.user.uid,
        email
      }
      await fire.firestore().collection('users').doc(_usr.uid).set(utilisateur).then(()=>console.log("added")).catch(err=>{
        console.log(err)
      })
    })
    .catch (err=>{
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-passeword":
          setPasswordError(err.message);
          break;

      }
    });

  };
  const handleLogout = () =>{
    fire.auth().signOut();
  };
  const authListener = () =>{
    fire.auth().onAuthStateChanged((user)=>{
      if (user){
        clearInputs();
        setUser(user);
      }else 
      setUser("");
    });

  };
  const emailUpdate = (val)=>{
    setEmail(val)
  }
  useEffect(async()=>{
  authListener();
  // fire.firestore().collection('data').map(usr=>usr.data())
  const citiesRef = fire.firestore().collection('data');
  const snapshot = await citiesRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  let arr = []
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    arr.push(doc.data())
  });
  setData(arr)
  

},[]);
  return (
    <div className="App">
      {user ? (
        <Hero handleLogout ={handleLogout} />
      ):(
        <Login 
        email={email} 
        emailUpdate={emailUpdate} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        handleSignup={handleSignup} 
        hasAccount={hasAccount}
        sethasAccount={sethasAccount}
        emailError={emailError}
        passwordError={passwordError}
  
        />
      )
      
      }
     
        
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()}/>
        
      </div>
  );
};

export default App;
