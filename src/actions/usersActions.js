import Swal from 'sweetalert2';
import clientAxios from '../config/clientAxios';
import {
    USER_LOGIN_INICIAR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_LOGOUT_ERROR
} from '../types';


export function loginUserAction(user){
    return async (dispatch) => {
        try{
            dispatch(loginUserActionIniciar(true));
            let userData = await clientAxios.post('api/login', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
            });
            //console.log(userData);
            if(!userData.data.ok){
                dispatch(loginUserActionError(userData.data.errorMessage))
                Swal.fire('Error', userData.data.errorMessage, 'error');
            }else{
                dispatch(loginUserActionSucces(userData.data.loginUser));

            }
        }catch(error){
            console.log(error);
            dispatch(loginUserActionError(error));
        }
    }
}

const loginUserActionIniciar = (loading) => ({
    type: USER_LOGIN_INICIAR,
    payload: loading

});

const loginUserActionSucces = (data) => ({
    type: USER_LOGIN_SUCCESS,
    payload: data
});

const loginUserActionError = (error) => ({
    type: USER_LOGIN_ERROR,
    payload: error
});

export function logoutUserAction(){
    return (dispatch) => {
        try{
            dispatch(logoutUserActionIniciar())
            Swal.fire('Session Finalizada', '', 'success');
        }catch(error){
            console.log(error)
            dispatch(logoutUSerActionError(error));
        }
    }
}

const logoutUserActionIniciar = () => ({
    type: USER_LOGOUT,
    payload: null
});

const logoutUSerActionError = (error) => ({
    type: USER_LOGOUT_ERROR,
    payload: error
})