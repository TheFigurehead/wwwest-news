import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import UserGlobal from './../global/UserGlobal';
import { Button, Icon, Typography } from '@material-ui/core';

const Profile = ( props ) => {
    const message = 'You are logged in.';

    const userInfo = [];

    if(UserGlobal.user !== false){
        for (const [key, value] of Object.entries(UserGlobal.user)) {
            if(key === 'isLoggedIn') continue;
            userInfo.push(
                <li key={key}>{key}: {value}</li>
            );
        }
    }

    return (
        <Typography
            style={
                {
                    padding: 20
                }
            }
        >
            <h3>Profile Page</h3>
            { (UserGlobal.isLoggedIn()) ? <div>{message}</div> : <Redirect to='login' />}
            
            { (userInfo.length > 0 ? <h4>User info</h4> : '' )}
            { (userInfo.length > 0 ? <ul>{userInfo}</ul> : '' )}
            
            <p>
                <h5>But you can -></h5>
                <Button 
                    startIcon={<Icon>exit_to_app</Icon>} 
                    onClick={props.signOut}
                    style={{
                            margin: 10,
                            padding: '10px 25px',
                            backgroundColor: '#311b92',
                            color: '#fff'
                        }
                    }
                >
                    Log Out
                </Button>
            </p>
        </Typography>
    );
}

export default connect(
    state => ({
        login: state.login
    }),
    dispatch => (
        {
            signOut: () => {
                dispatch( { type: 'SIGN_OUT' } );
            }
        }
    )
)(Profile);