import store from './store';

class UserGlobal{

    constructor(){

        if(! UserGlobal.instance ){

            this.user = this.checkUser();
            this.storeSubscription = this.storeSubscription.bind(this);
            this.saveUser = this.saveUser.bind(this);
            this.checkUser = this.checkUser.bind(this);

            store.subscribe(this.storeSubscription);

        }

        return UserGlobal.instance;
    }

    storeSubscription(){

        const state = store.getState();

        if(state.lastAction === 'SIGN_IN'){
            this.saveUser( state.login );
        }

        if(state.lastAction === 'SIGN_OUT'){
            this.saveUser( false );
        }

    }

    getUser(){
        return this.user;
    }

    isLoggedIn(){
        return (this.user) ? this.user.isLoggedIn : false;
    }

    checkUser(){
        const user = localStorage.getItem('user');

        if(user){

            try{

                const userObj = JSON.parse(user);
                store.dispatch(
                    {
                        type: 'SIGN_IN',
                        user: userObj
                    }
                );

                return userObj;

            }catch(e){

                console.log('User string cannot be converted to an object.');

            }
        }
        return false;
    }

    saveUser( user ){
        localStorage.setItem('user', JSON.stringify(
            user
        ));
        this.user = user;
    }

}


const instance = new UserGlobal();

export default instance;