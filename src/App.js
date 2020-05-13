import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

//Pages
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";

//Styles
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});

  //Getting config object so we can communicate with firebase
  const firebaseConfig = {
      apiKey: "AIzaSyAJUl2FBqMVEfhMm_viwRd7MU7fDpMOfi0",
      authDomain: "dynamic-final-project.firebaseapp.com",
      databaseURL: "https://dynamic-final-project.firebaseio.com",
      projectId: "dynamic-final-project",
      storageBucket: "dynamic-final-project.appspot.com",
      messagingSenderId: "648451877038",
      appId: "1:648451877038:web:07147c6d280b706409e53f"
    };

  //ensure app is initialized when it is ready to be
  useEffect(() => {
    //ensure app is not initialized more than that once
    //is firebase already initialized?
    if(!firebase.apps.length){
      //Initialize firebase
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(e){
        console.log("INSTANTIATING AUTH ERROR", e);
      });

  },[firebaseConfig]);

  //check to see if user is logged in
  //user loads page, check their status
    useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          //Logged In
          setUserInformation(user)
          setLoggedIn(true);
        } else{
          //Not Logged In
          setUserInformation({});
          setLoggedIn(false);
        }
        setLoading(false);
      })
    }, []);

  //LOG IN
  function LoginFunction(e){
    //default form - it'll authenticate if we program it to do just that:
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response){
        console.log("LOGIN RESPONSE", response);
        setLoggedIn (true);
      })
      .catch(function(e){
        console.log("LOGIN ERROR", e)
      });
   }

   //LOG OUT
   function LogoutFunction(){
     //clears out session storage to know that you're not logged in
     firebase
       .auth()
       .signOut()
       .then(function(){
         setLoggedIn (false);
       })
       .catch(function(e){
         console.log("LOGOUT ERROR", e);
       });
   }

   //CREATE AN ACCOUNT
   function CreateAccountFunction(e){
     //default form - it'll authenticate if we program it to do just that:
     e.preventDefault();
     //Default values for testing
     let email = e.currentTarget.createEmail.value;
     let password = e.currentTarget.createPassword.value;

     firebase
       .auth()
       .createUserWithEmailAndPassword(email, password)
       .then(function(response){
         console.log("VALID ACCOUNT CREATED", response);
         setLoggedIn(true);
       })
       .catch(function(e){
         console.log("CREATE ACCOUNT ERROR", e)
       });
   }

   // async function UploadImage(e){
   //   //For image uplaod, access to fireabse storage
   //   const storageRef = firebase.storage().ref();
   //   const fileReference = e.currentTarget.postImage.files[0];
   //   const uploadTask = storageRef
   //    .child(`${fileReference.name}`)
   //    .put(fileReference);
   //
   //    uploadTask.on(
   //      'state_changed',
   //      (snapshot) => {},
   //      (error) => {
   //        console.log(error);
   //      },
   //      () => {
   //        uploadTask
   //          .snapshot
   //          .Reference.getDownloadURL()
   //          .then(function(downloadURL){
   //            console.log("File available at", downloadURL);
   //            return downloadURL;
   //          });
   //      }
   //    );
   // }

  function createPostWithImage(e){
     e.preventDefault();
     //For image uplaod, access to fireabse storage
     const storageRef = firebase.storage().ref();
     const fileReference = e.currentTarget.postImage.files[0];
     const uploadTask = storageRef
      .child(`${fileReference.name}`)
      .put(fileReference);

      let text = e.currentTarget.postText.value;
      let idFromText = text.replace(/\s+/g, "-").toLowerCase().substr(0, 15);
      let userId = userInformation.uid;

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask
          .snapshot
          .ref.getDownloadURL()
          .then(function(downloadURL){
              //Send the data to API
              axios
                .get(
                  //MY API ENDPOINT
                  //Local:
                  `http://localhost:4000/create?text=${text}&id=${idFromText}&userId=${userId}&image=${downloadURL}`
                  //Production:
                  //`https://myheroku-deployed-api.heroku.com`
                )
                .then(function(response){
                  //Logs in success
                  //why does it not show??
                  console.log("response", response);
                })
                .catch(function(error){
                  //Logs in error
                  console.log(error);
                });
              ;
            });
        }
      );
   }

   if (loading) return null;


  return (
    <div className="App">
      <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn} />

      <Router>

        <Route exact path="/">
          {!loggedIn ? (
            <Redirect to="/login" />
          ):(
            <Home userInformation={userInformation} createPostWithImage={createPostWithImage} />
          )}
        </Route>

        <Route exact path="/post/:id">
          {!loggedIn ? (
            <Redirect to="/login" />
          ):(
            <SinglePost />
          )}
        </Route>

        <Route exact path="/login">
          {!loggedIn ? (
            <Login LoginFunction = {LoginFunction}/>
          ):(
            <Redirect to="/" />
          )}
        </Route>


        <Route exact path="/create-account">
          {!loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>

      </Router>
    </div>
  );
}

export default App;
