import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

import { 
    getDateString,
    getPreviousDateString 
} from '../../utils';

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
        const date = getDateString();
        return this.db.collection('profiles').doc(date).get()
            .then(profile => {
                if (profile.exists) return profile.data();
                else return null;
            });
    }

    registerView = () => {
        return fetch(FUNCTIONS_URL + 'registerView', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            });
    }

    verifyUserProfilePosition = () => {
        const date = getPreviousDateString();
        const userId = this.getUser().uid;
        return this.db.collection('users').doc(userId)
            .collection('auctions').doc(date).get()
            .then(position => {
                if (!position.exists || !position.data().winner) return false;
                else return true;
            });
    }

    /*** AUCTION API ***/

    getCurrentAuction = () => {
        const date = getDateString();
        return this.db.collection('auctions').doc(date).get()
            .then(auction => {
                if (auction.exists) return auction.data();
                else return null;
            })
    }

    bidCurrentAuction = (bid) => {
        return this.getUser().getIdToken()
            .then(token => {
                return fetch(FUNCTIONS_URL + 'bidCurrentAuction', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                        'Bid': bid
                    }
                })
                    .then(response => {
                        return response.json();
                    });
            });
    }

    verifyUserAuctionPosition = () => {
        const date = getDateString();
        const userId = this.getUser();
        return this.db.collection('users').doc(userId)
            .collection('auctions').doc(date).get()
            .then(position => {
                if (!position.exists) return null
                return position.data()
            });
    }
}

export default Firebase;