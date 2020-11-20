// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDX-lCB6LK8gJh4LNV6QKQohAy5uQVdzyE",
    authDomain: "ig-clone-cde8b.firebaseapp.com",
    databaseURL: "https://ig-clone-cde8b.firebaseio.com",
    projectId: "ig-clone-cde8b",
    storageBucket: "ig-clone-cde8b.appspot.com",
    messagingSenderId: "223583412426",
    appId: "1:223583412426:web:4949a9805547abbf969433",
    measurementId: "G-FHX5VQD6VY"
  })

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage }