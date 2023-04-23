import {Link, Outlet} from "react-router-dom";
import './root.css'
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectLoggedUser, selectMessage} from "../users/usersSlice";
import {useState} from "react";

export const Root = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(selectLoggedUser);
    const errorMessage = useSelector(selectMessage);
    const [loginData, setLoginData] = useState({login: '', password: ''});
    const [activeAnimation, setActiveAnimation] = useState(false);



    const handleLogin = () => {
        dispatch(login(loginData));
        setActiveAnimation(true);
        setTimeout(() => setActiveAnimation(false), 5000);
    }

    const handleLogout = () => {
        setLoginData({login: '', password: ''});
        dispatch(logout());
    }

    return (
        <div className="App">
            <header>
                <Link to="/"><h1><span>Resto</span> Manager</h1></Link>
                    {loggedUser.name ?
                        (
                            <div id="loggingScreen">
                                <p>Witaj, {loggedUser.name}!</p>
                                <p>Twoje ID to {loggedUser.id}</p>
                                <button onClick={handleLogout}>Wyloguj</button>
                            </div>
                        )
                        :
                        (
                            <div id="loggingScreen">
                                <label>
                                    <p>Użytkownik:</p>
                                    <input onChange = {({target}) => {setLoginData({...loginData, login: target.value})}}/>
                                </label>
                                <label>
                                    <p>Hasło:</p>
                                    <input onChange = {({target}) => {setLoginData({...loginData, password: target.value})}} type="password"/>
                                </label>
                                <button onClick={handleLogin}>Zaloguj!</button>
                            </div>
                        )
                    }
                <div id="errorMessage" className={activeAnimation ? "animate" : undefined}>
                    <p>{errorMessage}</p>
                </div>

            </header>
            <section className="content">
                <Outlet/>
            </section>
        </div>
    )
}