import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, FormHelperText, TextField, InputLabel, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'inline-flex',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap'
    },
    formControl: {
        marginRight: 20,
    }
}));

const SearchForm = (props) => {

    const classes = useStyles();

    return (
        <form className={classes.form} noValidate autoComplete="off">

            <FormControl className={classes.formControl}>
                <TextField type="text" label="Search query" defaultValue={props.defaultQuery} onChange={props.onQueryChange} />
                <FormHelperText>Type your query.</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel shrink id="sorting-select">
                    Sorting
                </InputLabel>
                <Select
                    native
                    labelId="sorting-select"
                    defaultValue={props.sortByDefault}
                    onChange={props.sortByHandler}
                    inputProps={{
                        name: 'sortBy',
                        id: 'sortBy',
                    }}
                >
                    <option value={'publishedAt'}>Publishing</option>
                    <option value={'relevancy'}>Relevancy</option>
                    <option value={'popularity'}>Popularity</option>
                </Select>
                <FormHelperText>Choose the sort order.</FormHelperText>
            </FormControl>

            <Button onClick={props.onSubmit} variant="contained" color="primary">
                Take my News
            </Button>
            
        </form>
    );
}

export default SearchForm;