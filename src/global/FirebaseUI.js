import store from './store';
import * as  firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

import UserGlobal from './UserGlobal';

import firebaseConfig from './../firebaseAppCredentials';

class FirebaseUI{

    constructor(){

        if(! FirebaseUI.instance ){

            
            this.app = firebase.initializeApp(firebaseConfig);
            
            this.firebase = firebase;
            
            this.ui = new firebaseui.auth.AuthUI( this.firebase.auth() );
            this.init = this.init.bind(this);
            
            this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

            this.firebase.auth().onAuthStateChanged( this.onAuthStateChanged );

            FirebaseUI.instance = this;

        }

        return FirebaseUI.instance;

    }

    init(){
        if(document.getElementById('google_ui')){
            this.ui.start( '#google_ui', {
            
                callbacks: {
                    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                        const user = this.firebase.auth().currentUser;
                        const userObj = {
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                            login: user.displayName
                        };
                        
                        UserGlobal.saveUser( userObj );
                
                        UserGlobal.checkUser();
                        
                        store.dispatch(
                            {
                                type: 'SIGN_IN',
                                user: userObj
                            }
                        );

                        return false;
                  },
                },
                signInSuccessUrl: 'https://est-test-6d55a.firebaseapp.com',
                signInFlow: 'popup',
                signInOptions: [
                    this.firebase.auth.GoogleAuthProvider.PROVIDER_ID 
                ],
                privacyPolicyUrl: function() {
                    window.location.assign('https://est-test-6d55a.firebaseapp.com');
                }
            });
            
            this.ui.disableAutoSignIn();
        }
    }

    onAuthStateChanged(user){

        if( !user ) {
            UserGlobal.saveUser( false );
            return false;
        }

    }

}

const instance = new FirebaseUI();

export default instance;