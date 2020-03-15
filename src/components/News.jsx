import React from 'react';
import { connect } from 'react-redux';

import Pagination from './news/Pagination.jsx';
import SearchForm from './news/SearchForm.jsx';
import NewsItem from './news/NewsItem.jsx';
import Grid from '@material-ui/core/Grid';

class News extends React.Component{

    constructor(props){
        
        super(props);
        
        this.props = props;

        this.state = {
            articles: [],
            search: '',
            isFetching: false,
            sortBy: 'publishedAt',
            pageCount: 10
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
        this.makeRequestEvent = this.makeRequestEvent.bind(this);
        this.onPageChange = this.onPageChange.bind(this);

        this.isFetching = false;

        this.styles = {
            root: {
                padding: 20
            }
        }
    
    }

    onQueryChange(e){
        this.setState( { search: e.target.value } );
    }

    sortByHandler(e){
        this.setState( { sortBy: e.target.value } );
    }

    onPageChange(page){
        this.props.changePage(page);
        this.makeRequestEvent(page);
    }

    getCurrentDate(){

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    makeRequestEvent(page = false){
        this.setState({isFetching: true});
        this.makeNewsRequest(page);
    }

    makeNewsRequest(page = false){

        console.log('Page: ', page, (!page) ? this.props.page : page);

        let url = new URL('https://newsapi.org/v2/everything');

        url.searchParams.append('from', this.getCurrentDate());
        url.searchParams.append('sortBy', this.state.sortBy);
        url.searchParams.append('language', 'en');
        url.searchParams.append('apiKey', 'a20e4161f1aa4c819152ab9c355f7523');
        url.searchParams.append('page', (!page) ? this.props.page : page);
        url.searchParams.append('pageSize', 10);
        url.searchParams.append('q', this.state.search);

        fetch(url)
        .then( response => response.json() )
        .then( data => { 
            if(data.status === 'ok'){
                this.setState(
                    { 
                        articles: data.articles,
                        pageCount: ( Math.ceil( data.totalResults / 10 ) <= 10 ) ? Math.ceil( data.totalResults / 10 ) : 10,
                        isFetching: false
                    }
                );
            }
        });

    }

    render(){

        const content = [];

        content.push( 
            <SearchForm 
                defaultQuery={this.state.search} 
                onQueryChange={this.onQueryChange} 
                sortByDefault={this.state.sortBy} 
                sortByHandler={this.sortByHandler} 
                onSubmit={this.makeRequestEvent}
            /> 
        );

        if(this.state.articles.length > 0){
            content.push(
                <React.Fragment>
                    
                    <Grid container spacing={3}>
                        {this.state.articles.map(
                            (item, i) => {
                                return (
                                    <NewsItem key={i} article={item} />
                                );
                            }
                        )}
                    </Grid>

                    <Pagination pageCount={ this.state.pageCount } onClick={this.onPageChange} />

                </React.Fragment>
            );
        }

        return(
            <div style={ this.styles.root }>

                {content}

                <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>

            </div>
        );
    }

}

export default connect(
    state => ({
        page: state.pagination
    }),
    dispatch => ({
        changePage: (page) => {
            dispatch({ type: 'CHANGE_PAGE', payload: page });
        },
        nextPage: (page) => {
            dispatch({ type: 'NEXT_PAGE', payload: page });
        }
    })
)(News);