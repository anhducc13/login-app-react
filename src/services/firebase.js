import * as firebase from 'firebase';

const appFirebase = firebase.initializeApp({
    apiKey: "AIzaSyAcjbrVQyOOlY-SadQ8TWmldob2SjH5trM",
    authDomain: "ductt-217110.firebaseapp.com",
    databaseURL: "https://ductt-217110.firebaseio.com",
    storageBucket: "ductt-217110.appspot.com",
});

// const uploadAvatar = (file) => 

export default appFirebase;

// const ref = firebase.storage().ref();
// const file = document.querySelector('#photo').files[0]
// const name = file.name;
// const metadata = {
//   contentType: file.type
// };
// const task = ref.child(name).put(file, metadata);
// task
//   .then(snapshot => snapshot.ref.getDownloadURL())
//   .then((url) => {
//     console.log(url);
//   })
//   .catch(console.error);