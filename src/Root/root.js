import {Link, Outlet} from "react-router-dom";
import './root.css'
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectLoggedUser} from "../users/usersSlice";
import {useState} from "react";

export const Root = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectLoggedUser);
    const [loginData, setLoginData] = useState({login: '', password: ''})
    const handleRestart = () => {
        // eslint-disable-next-line no-restricted-globals
        fetch('http://localhost:4000/restart').then(location.reload());
    }

    const handleLogin = () => {
        dispatch(login(loginData));
    }

    const handleLogout = () => {
        setLoginData({login: '', password: ''});
        dispatch(logout());
    }

    return (
        <div className="App">
            <header>
                <Link to="/"><h1>resto_manager</h1></Link>
                <button onClick={handleRestart}>RESTART</button>
                <div id="loggingScreen">
                    {loggedUser.name ?
                        <p>Logged user: {loggedUser.name} <button onClick={handleLogout}>Logout</button></p>
                        :
                        (
                            <div>
                                <label>
                                    Użytkownik:
                                    <input onChange = {({target}) => {setLoginData({...loginData, login: target.value})}}/>
                                </label>
                                <label>
                                    Hasło:
                                    <input onChange = {({target}) => {setLoginData({...loginData, password: target.value})}} type="password"/>
                                </label>
                                <button onClick={handleLogin}>Login</button>
                            </div>
                        )
                    }
                </div>

            </header>
            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}