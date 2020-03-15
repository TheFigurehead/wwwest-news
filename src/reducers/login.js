const initialState = {
    login: null,
    isLoggedIn: false
};

export default function login(state = initialState, action) {
    
    if (action.type === 'SIGN_IN') {

        return {
            ...action.user,
            isLoggedIn: true
        };
        
    }
    
    if (action.type === 'SIGN_OUT') {

        return {
            isLoggedIn: false
        };
        
    }

    return state;

}