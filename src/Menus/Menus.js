import './menus.css'
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMenu, deleteMenu, fetchMenus, selectMenus, selectStatus} from "./menusSlice";
import {useEffect, useState} from "react";

// const menusArray = [{id: 1, name: 'Menu tradycyjne'}, {id: 2, name: 'Menu sezonowe'}];



export const Menus = () => {
    const menus = useSelector(selectMenus);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [newMenu, setNewMenu] = useState('');

    const renderMenus = (menu) => {
        return (
             <div className="menu" key={`menu ${menu.id}`}>
                 <NavLink to={String(menu.id)}><p>{menu.name}</p></NavLink>
                <button onClick = {() => dispatch(deleteMenu(menu.name))}>X</button>
            </div>
        )
    }

    const handleNewMenu = ({target}) => {
        setNewMenu(target.value);
    }

    const submitNewMenu = () => {
        dispatch(addMenu(newMenu));
    }

    return (
        <section id="menus">
            <div>
                <p>New menu:</p>
                <input defaultValue={'name'} onChange={handleNewMenu}></input>
                <button onClick={submitNewMenu}>ADD</button>
            </div>
            <div id="menusGallery">
                {
                    status === 'ok' ? menus.map(renderMenus) : 'Loading...'
                }
            </div>
            <div id="menuDetails">
                <Outlet/>
            </div>
        </section>
    )
}