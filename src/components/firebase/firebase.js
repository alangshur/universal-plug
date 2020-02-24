import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

var config = {
    apiKey: "AIzaSyDOTJ2VnZmsyuxHNLAd_-LtGjZCE8_xnhg",
    authDomain: "universal-plug.firebaseapp.com",
    databaseURL: "https://universal-plug.firebaseio.com",
    projectId: "universal-plug",
    storageBucket: "universal-plug.appspot.com",
    messagingSenderId: "388342153426",
    appId: "1:388342153426:web:7db8a35b005af5eb096d0b",
    measurementId: "G-HHJ0LR6WGH"
}

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth();
        this.db = app.database();
        this.analytics = app.analytics();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    /*** AUTH API ***/

    doSignIn = () => {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    doSignOut = () => {
        return this.auth.signOut();
    }

    getUser = () => {
        return this.auth.currentUser;
    }
}

export default Firebase;