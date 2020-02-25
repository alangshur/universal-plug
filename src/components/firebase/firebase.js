import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

import { getDateString } from '../../utils';

const config = {
    apiKey: "AIzaSyDOTJ2VnZmsyuxHNLAd_-LtGjZCE8_xnhg",
    authDomain: "universal-plug.firebaseapp.com",
    databaseURL: "https://universal-plug.firebaseio.com",
    projectId: "universal-plug",
    storageBucket: "universal-plug.appspot.com",
    messagingSenderId: "388342153426",
    appId: "1:388342153426:web:7db8a35b005af5eb096d0b",
    measurementId: "G-6ECP04B4NK"
};

const FUNCTIONS_URL = 'https://us-central1-universal-plug.cloudfunctions.net/';

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth();
        this.db = app.firestore();
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



    /*** PROFILE API ***/

    getCurrentProfile = () => {
        const currentDate = getDateString();
        return this.db.collection('profiles').doc(currentDate).get()
        .then(profile => {
            if (profile.exists) return profile.data();
            else return null;
        });
    }

    registerView = () => {
        return fetch(FUNCTIONS_URL + 'registerView');
    }
}

export default Firebase;