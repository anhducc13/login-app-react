import * as firebase from 'firebase';
import uuidv4 from 'uuid/v4';

const appFirebase = firebase.initializeApp({
    apiKey: "AIzaSyAcjbrVQyOOlY-SadQ8TWmldob2SjH5trM",
    authDomain: "ductt-217110.firebaseapp.com",
    databaseURL: "https://ductt-217110.firebaseio.com",
    storageBucket: "ductt-217110.appspot.com",
});

const uploadFileImage = (blob) => {
    const filename = Date.now().toString() + uuidv4();
    const ref = appFirebase.storage().ref(`avatar/${filename}`);
    return ref.put(blob).then(snapshot => snapshot.metadata.fullPath)
}

const getDownloadURL = (refName) => {
    const ref = appFirebase.storage().ref();
    return ref.child(refName).getDownloadURL();
}

const deleteFileImage = (refName) => {
    const ref = appFirebase.storage().ref();
    return ref.child(refName).delete();
}

export default {
    uploadFileImage,
    getDownloadURL,
    deleteFileImage,
};