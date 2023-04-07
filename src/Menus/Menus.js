import './menus.css'
import {NavLink, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectMenus} from "./menusSlice";

// const menusArray = [{id: 1, name: 'Menu tradycyjne'}, {id: 2, name: 'Menu sezonowe'}];

const renderMenus = (menu) => {
    return (
        <NavLink to={String(menu.id)} className="menu">
            <p>{menu.name}</p>
        </NavLink>
    )
}

export const Menus = () => {
    const menus = useSelector(selectMenus);

    return (
        <section id="menus">
            <div id="menusGallery">
                {menus.map(renderMenus)}
            </div>
            <div id="menuDetails">
                <Outlet/>
            </div>
        </section>
    )
}