import {
    USER_LOGIN_INICIAR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR
} from '../types';


export function loginUserAction(user){
    return (dispatch) => {
        try{
            dispatch(loginUserActionIniciar({user, loading: true}));
            dispatch(loginUserActionSucces(false));
        }catch(error){
            console.log(error);
            dispatch(loginUserActionError(error));
        }
    }
}

const loginUserActionIniciar = (data) => ({
    type: USER_LOGIN_INICIAR,
    payload: data

});

const loginUserActionSucces = (loading) => ({
    type: USER_LOGIN_SUCCESS,
    payload: loading
});

const loginUserActionError = (error) => ({
    type: USER_LOGIN_ERROR,
    payload: error
});