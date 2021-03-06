import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../actions/usersActions';
import './Login.css';
export const Login = () => {
    const dispatch = useDispatch();
    const loginUser = (user) => dispatch(loginUserAction(user));
    const [loginFormValues, setLoginFormValues] = useState({
        TID: '',
        password: ''
    })
    const submitLogin = (e) => {
        e.preventDefault();
        loginUser(loginFormValues)
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        setLoginFormValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-26">
                            STELLANTIS
					    </span>
                        <span className="login100-form-title p-b-48">
                            <i className="zmdi zmdi-font"></i>
                        </span>

                        <div className="wrap-input100 validate-input" >
                            <input className="input100" placeholder="TID" type="text" name="TID" value={loginFormValues.TID} onChange={handleLoginForm} />
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="btn-show-pass">
                                <i className="zmdi zmdi-eye"></i>
                            </span>
                            <input className="input100" type="password" placeholder="PASSWORD" name="password" value={loginFormValues.password} onChange={handleLoginForm} />
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" onClick={submitLogin}>
                                    Login
							</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
