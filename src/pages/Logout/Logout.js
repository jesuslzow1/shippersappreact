import {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../actions/usersActions';

export const Logout = ({history}) => {
    const dispatch = useDispatch();
    const logoutUser = () => dispatch(logoutUserAction())
    useEffect(() => {
        logoutUser();
        history.push('/');
    })
    return (
        null
    )
}
