import './homepage.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectLoggedUser} from "../users/usersSlice";

export const Homepage = () => {
        const {admin, manager, active} = useSelector(selectLoggedUser);
        console.log(admin, manager, active);
    return (
        <div id="homepage">
            <NavLink to={active ? 'tables' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Obsługa kelnerska</p>
            </NavLink>
            <NavLink to={active ? 'delivery' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Dostawy</p>
            </NavLink>
            <NavLink to={active ? 'kitchen' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Kuchnia</p>
            </NavLink>
                <NavLink to={admin ? 'menus' : '/'} className={`menuContainer ` + (admin ? '' : 'disabled')}>
                        <img src={require('./menuImg.png')} alt="menu icon"/>
                        <p>Edycja Menu</p>
                </NavLink>
            <NavLink to={manager ? 'sales' : '/'} className={`menuContainer ` + (manager ? '' : 'disabled')}>
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Wyniki sprzedaży</p>
            </NavLink>
            <NavLink to={admin ? 'settings' : '/'} className={`menuContainer ` + (admin ? '' : 'disabled')}>
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Ustawienia</p>
            </NavLink>
        </div>
    )
}