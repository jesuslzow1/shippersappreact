import React from 'react';
import {useDispatch} from 'react-redux';
import {loginUserAction} from '../../actions/usersActions';

export const Login = () => {
    const dispatch = useDispatch();
    const loginUser = (user) =>  dispatch(loginUserAction(user));
    const submitLogin = () => {
        
        loginUser({
            email: 'jesuslz@gmail.com',
            name: 't0939jl',
            role:['admin', 'manager']
        })
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={submitLogin}>Iniciar Sesion</button>
        </div>
    )
}
