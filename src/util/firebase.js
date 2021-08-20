import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD2UBOPgbK95iAKLWRZqhGfZzNs8ic6wF0",
    authDomain: "rci-time-card.firebaseapp.com",
    projectId: "rci-time-card",
    storageBucket: "rci-time-card.appspot.com",
    messagingSenderId: "906470114401",
    appId: "1:906470114401:web:4c17bddd8897d425fdd620",
    measurementId: "G-5W1FGFK1TY"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth}