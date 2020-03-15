import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    }
}));

const NewsItem = (props) => {

    const classes = useStyles();

    const author = (props.article.author) ? props.article.author : 'Unknown';
    const authorLetter = author.charAt(0);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} zeroMinWidth>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {
                            authorLetter
                        }
                    </Avatar>
                    }
                    title={author}
                    subheader={props.article.publishedAt}
                />
                <CardMedia
                    className={classes.media}
                    image={(props.article.urlToImage) ? props.article.urlToImage : 'http://via.placeholder.com/350x150'}
                    title={props.article.title}
                />
                <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.article.description}
                        </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link href={props.article.url} target="_blank">
                        <Icon>more_horiz</Icon>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );

}

export default NewsItem;