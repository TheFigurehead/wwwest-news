import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import { List, ListItem  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      padding: 0
    },
    item: {
        backgroundColor: '#1a237e',
        color: '#fff',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#303f9f',
        }
    },
    link: {
        padding: '20px',
        width: '100%',
        color: '#fff',
        textDecoration: 'unset',
        textAlign: 'center'
    }
}));

const Navigation = (props) => {
    const classes = useStyles();
    return (
        <List className={classes.root} component="nav" dense={true}>
            <ListItem className={classes.item}>
                <Link className={classes.link} to="/">Home</Link>
            </ListItem>
            <ListItem className={classes.item}>
                <Link className={classes.link} to="/news">News</Link>
            </ListItem>
            <ListItem className={classes.item}>
                <Link className={classes.link} to="/profile">Profile</Link>
            </ListItem>
            <ListItem className={classes.item}>
                <Link className={classes.link} to="/login">Login</Link>
            </ListItem>
        </List>
    );
}

export default Navigation;