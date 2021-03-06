import {
    USER_LOGIN_INICIAR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_LOGOUT_ERROR
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
                user: null,
                loading: action.payload
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                user: null
            }
        case USER_LOGOUT:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;
