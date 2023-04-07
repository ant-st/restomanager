import './homepage.css'
import {NavLink} from "react-router-dom";

export const Homepage = () => {
    return (
        <div id="homepage">
            <NavLink to={'tables'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Obsługa kelnerska</p>
            </NavLink>
            <NavLink to={'menus'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Edycja Menu</p>
            </NavLink>
            <NavLink to={'delivery'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Dostawy</p>
            </NavLink>
            <NavLink to={'kitchen'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Kuchnia</p>
            </NavLink>
            <NavLink to={'sales'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Wyniki sprzedaży</p>
            </NavLink>
            <NavLink to={'settings'} className="menuContainer">
                    <img src={require('./menuImg.png')} alt="menu icon"/>
                    <p>Ustawienia</p>
            </NavLink>
        </div>
    )
}