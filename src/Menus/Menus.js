import './menus.css'
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenus, selectMenus} from "./menusSlice";
import {useEffect} from "react";

// const menusArray = [{id: 1, name: 'Menu tradycyjne'}, {id: 2, name: 'Menu sezonowe'}];

const renderMenus = (menu) => {
    return (
        <NavLink to={String(menu.id)} className="menu" key={`menu ${menu.id}`}>
            <p>{menu.name}</p>
        </NavLink>
    )
}

export const Menus = () => {
    const menus = useSelector(selectMenus);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(menus);
    })

    return (
        <section id="menus">
            <div id="menusGallery">
                {
                    menus.map(renderMenus)
                }
            </div>
            <div id="menuDetails">
                <Outlet/>
            </div>
        </section>
    )
}