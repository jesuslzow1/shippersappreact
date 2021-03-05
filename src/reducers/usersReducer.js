import {
    USER_LOGIN_INICIAR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR
} from '../types';
const initialUsersState = {
    user: null,
    loading: false,
    error: null
}


const usersReducer =  function (state = initialUsersState, action){
    switch (action.type) {
        case USER_LOGIN_INICIAR:
            return {
                ...state,
                user: action.payload.user,
                loading: action.payload.loading
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;
