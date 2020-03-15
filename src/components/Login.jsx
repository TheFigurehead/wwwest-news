import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import FirebaseUI from './../global/FirebaseUI';

import { connect } from 'react-redux';

import UserGlobal from './../global/UserGlobal';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        padding: 20
    },
    form: {
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    formControl: {
        marginRight: 10
    }
}));

const Login = (props) => {

    const classes = useStyles();

    useEffect(()=>{
        FirebaseUI.init();
    }, []);
    
    let loginInput = React.createRef();
    let passwordInput = React.createRef();

    const [error, setError] = useState({
        loginMessage: 'Incorrect login',
        passwordMessage: 'Incorrect password',
        error: false
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        
        if( loginInput.current.value === 'admin' && passwordInput.current.value === 'admin' ){

            props.signIn(
                {
                    login: loginInput.current.value
                }
            );


        }else{

            setError(
                {
                    ...error,
                    error: true
                }
            ); 
            
        }
    }
    
    return (
        <div className={classes.root}>

            {( UserGlobal.isLoggedIn() ) ? <Redirect to='profile' /> : ''}

            <h3>Login page</h3>

            <div id="google_ui">
            </div>

            <form className={classes.form} onSubmit={onSubmit}>
                <FormControl className={classes.formControl}>
                    <TextField 
                        label="Login" 
                        name="login" 
                        id="login" 
                        variant="outlined"
                        inputRef={loginInput} 
                        error={error.error}
                        helperText={(error.error) ? error.loginMessage : ''}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField 
                        label="Password" 
                        type="password" 
                        name="password" 
                        id="password" 
                        variant="outlined"
                        inputRef={passwordInput} 
                        error={error.error}
                        helperText={(error.error) ? error.passwordMessage : ''}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button type="submit" variant="outlined" color="primary">Login</Button>
                </FormControl>
            </form>

        </div>
    );

}

export default connect(
    state => ({
        login: state.login
    }),
    dispatch => ({
        signIn: (user) => {
            dispatch( { type: 'SIGN_IN', user: user } );
        }
    })
)(Login);