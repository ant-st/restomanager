// noinspection JSCheckFunctionSignatures

import './menus.css'
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMenu, deleteMenu, selectMenus, selectStatus} from "./menusSlice";
import {useState} from "react";
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";

// const menusArray = [{id: 1, name: 'Menu tradycyjne'}, {id: 2, name: 'Menu sezonowe'}];



export const Menus = () => {
    const menus = useSelector(selectMenus);
    const status = useSelector(selectStatus);
    const {admin} = useSelector(selectLoggedUser);
    const dispatch = useDispatch();

    const [newMenu, setNewMenu] = useState('');

    const renderMenus = (menu) => {
        return (
            <NavLink to={String(menu.id)} className="menu">
                <div key={`menu ${menu.id}`}>
                    <p>{menu.name}</p>
                    <button onClick = {() => dispatch(deleteMenu(menu.name))}>Usuń</button>
                </div>
            </NavLink>
        )
    }

    const handleNewMenu = ({target}) => {
        setNewMenu(target.value);
    }

    const submitNewMenu = () => {
        dispatch(addMenu(newMenu));
    }

    if (admin) return (
        <section id="menus">
            <div id="menuCreator">
                <input placeholder="Nowe menu" onChange={handleNewMenu}></input>
                <button onClick={submitNewMenu}>DODAJ</button>
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
    else return <AccessDenied/>
}