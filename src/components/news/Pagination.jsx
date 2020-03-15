import React from 'react';
import { connect } from 'react-redux';

import { Pagination as PaginationUI } from '@material-ui/lab';

const Pagination = (props) => {

    const handleChange = (event, page) => {
        // props.changePage(page);
        props.onClick(page);
    }

    return (
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <PaginationUI 
                count={props.pageCount} 
                size="large" 
                showFirstButton 
                showLastButton 
                onChange={handleChange}
            />
        </div>
    );
}

export default connect(
    state => ({
        page: state.pagination
    })
)(Pagination);