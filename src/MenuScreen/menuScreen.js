import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addPositionToMenu, deletePosition, selectMenus} from "../Menus/menusSlice";
import {useEffect, useState} from "react";
import './menuScreen.css'

export const MenuScreen = () => {
    const dispatch = useDispatch();

    let { id } = useParams();
    let menus = useSelector(selectMenus);

    const [menuItems, setMenuItems] = useState([]);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newPrice, setNewPrice] = useState(0);

    useEffect(() => {
            for (let i=0;i<menus.length;i++) {
                if (
                    menus[i].id === Number(id)) {
                    setMenuItems(menus[i].positions);
                }
            }
        }, [menus, id]);

    const renderMenuItems = (item) => {
        return (
            <div className = "menuPosition" key={item.name}>
                <div className="nameAndDesc">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
                <h4>{item.price}$</h4>
                <div>
                    <button onClick = {() => {
                        dispatch(deletePosition({name: item.name, menuId: id}))
                    }}>Usuń</button>

                </div>
            </div>
        )

        /*
        <button onClick = {() => {
                        dispatch(swapPosition({name: item.name, menuId: id, down: true}))
                    }}>Down</button>
                    <button onClick = {() => {
                        dispatch(swapPosition({name: item.name, menuId: id, down: false}))
                    }}>Up</button>
         */
    }

    const handleNameChange = ({target}) => {
        setNewName(target.value);
    }

    const handleDescChange = ({target}) => {
        setNewDesc(target.value);
    }

    const handlePriceChange = ({target}) => {
        setNewPrice(target.value);
    }

    const handleSubmit = () => {
        let newPosition = {
            'menu_id': id,
            name: newName,
            description: newDesc,
            price: newPrice
        }
        dispatch(addPositionToMenu(newPosition));
    }

    return (
        <div>
            <div id="menuList">
                <div id="menuPosCreator">
                    <input defaultValue="Nazwa" onChange={handleNameChange}/>
                    <input defaultValue="Opis" onChange={handleDescChange}/>
                    <input defaultValue="Cena" onChange={handlePriceChange}/>
                    <button onClick={handleSubmit}>Dodaj!</button>
                </div>
                {menuItems.map(renderMenuItems)}
            </div>
        </div>
    )
}