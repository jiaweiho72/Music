
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { collection, doc, setDoc } from 'firebase/compat/firestore';
import { React, useEffect, useState } from 'react';
import { serviceAccount } from './service-account.json';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9Vnn80JZ4hvzSE3afLe7JX56KDqeJJ2k",
    authDomain: "music-65e56.firebaseapp.com",
    projectId: "music-65e56",
    storageBucket: "music-65e56.appspot.com",
    messagingSenderId: "691017517741",
    appId: "1:691017517741:web:242b2616babe1a00d2d424",
    measurementId: "G-RKJYYB51CD",
};

const conifigTwo = {
    serviceAccount: serviceAccount
}

let app; 
let app2;


if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
    //app2 = firebase.initializeApp(conifigTwo, 'myOtherApp');

} else {
    app = firebase.app();
    //app2 = firebase.app('myOtherApp');
}


console.log(serviceAccount)

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
console.log("start")
const auth = firebase.auth();
//const user = auth.currentUser;
const firestore = firebase.firestore();
console.log("end")


async function signUp(email, password) {
    //const { user, session, error } = await signUp(email, password);
    return auth.createUserWithEmailAndPassword(email, password);
}

async function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

async function initialiseUser() {
    const user = auth.currentUser;
    const usersCollection = firestore.collection("Users");
    return usersCollection
        .doc(user.uid)
        .set({
            name: NaN,
            age: NaN,
            genre: NaN,
            Spotify: NaN,
    })
}

async function updateUserData(name, age) {
    const user = auth.currentUser;
    console.log(user);
    const usersCollection = firestore.collection("Users");
    return usersCollection
        .doc(user.uid)
        .update({
            name: name,
            age: age,
            genre: NaN,
    })
    
   /*
   const ref = doc(collection(db, "Users"), user.uid);
    setDoc(ref, {
        name: name,
        age: age,
        genre: NaN,
    })
    */
}


const db = firebase.firestore();

async function updateUserGenre(genre) {
    const user = auth.currentUser;
    const usersCollection = firestore.collection("Users");
    return usersCollection
        .doc(user.uid)
        .update({
            genre: genre
    })
}

async function linkSpotify(accessToken) {
    console.log('linking spotify: ' + accessToken);
    const user = auth.currentUser;
    const usersCollection = firestore.collection("Users");
    return usersCollection
        .doc(user.uid)
        .update({
            Spotify: accessToken,
    })
}

async function getData() {
    const user = auth.currentUser;
    if (user != null) {
        const usersCollection = firestore.collection("Users");
        return usersCollection
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
                //console.log('User exists: ', documentSnapshot.exists);
            
                if (documentSnapshot.exists) {
                //console.log('User data: ', documentSnapshot.data());
                return documentSnapshot.data();
                }
            });
    } else return null;
}

async function createToken(uid) {
    return myOtherApp.auth().createCustomToken(uid);
}

export { firebase, auth, signIn, signUp, updateUserData, updateUserGenre, createToken, linkSpotify,
        getData, initialiseUser,
};