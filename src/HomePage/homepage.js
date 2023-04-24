import './homepage.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectLoggedUser} from "../users/usersSlice";

export const Homepage = () => {
        const {admin, manager, active} = useSelector(selectLoggedUser);
        return (
        <div id="homepage">
            <NavLink to={active ? 'tables' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./tableImg.png')} alt="table icon"/>
                    <p>Obsługa kelnerska</p>
            </NavLink>
            <NavLink to={active ? 'delivery' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./deliImg.png')} alt="delivery icon"/>
                    <p>Dostawy</p>
            </NavLink>
            <NavLink to={active ? 'kitchen' : '/'} className={`menuContainer ` + (active ? '' : 'disabled')}>
                    <img src={require('./kitchenImg.png')} alt="kitchen icon"/>
                    <p>Kuchnia</p>
            </NavLink>
                <NavLink to={admin ? 'menus' : '/'} className={`menuContainer ` + (admin ? '' : 'disabled')}>
                        <img src={require('./menuImg.png')} alt="menu icon"/>
                        <p>Edycja Menu</p>
                </NavLink>
            <NavLink to={manager ? 'sales' : '/'} className={`menuContainer ` + (manager ? '' : 'disabled')}>
                    <img src={require('./salesImg.png')} alt="sales icon"/>
                    <p>Wyniki sprzedaży</p>
            </NavLink>
            <NavLink to={admin ? 'settings' : '/'} className={`menuContainer ` + (admin ? '' : 'disabled')}>
                    <img src={require('./settingsImg.png')} alt="settings icon"/>
                    <p>Ustawienia</p>
            </NavLink>
        </div>
    )
}