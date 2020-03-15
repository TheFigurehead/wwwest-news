const minState = 1;
const maxState = 10;
  
export default function pagination(state = minState, action) {
    
    if (action.type === 'CHANGE_PAGE') {

        if( action.payload <= 0 ){
            return minState;
        }

        if( action.payload >= 10 ){
            return maxState;
        }
    
        return action.payload;
        
    }

    if (action.type === 'NEXT_PAGE') {

        if( state <= 0 ){
            return minState;
        }

        if( state >= 10 ){
            return maxState;
        }
    
        return state + 1;
        
    }

    if (action.type === 'PREV_PAGE') {

        if( state <= 0 ){
            return minState;
        }

        if( state >= 10 ){
            return maxState;
        }
    
        return state - 1;
        
    }

    return state;

}