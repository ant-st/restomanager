import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addPositionToMenu, selectMenus} from "../Menus/menusSlice";
import {useEffect, useState} from "react";
import './menuScreen.css'

export const MenuScreen = () => {
    const dispatch = useDispatch();

    let { id } = useParams();
    let menus = useSelector(selectMenus);

    const [menuItems, setMenuItems] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newPrice, setNewPrice] = useState(0);

    useEffect(() => {
            for (let i=0;i<menus.length;i++) {
                if (
                    menus[i].id === Number(id)) {
                    setMenuName(menus[i].name);
                    setMenuItems(menus[i].positions);
                }
            }
        }, [menus, id]);

    const renderMenuItems = (item) => {
        return (
            <div className = "menuPosition">
                <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                </div>
                <h4>{item.price}</h4>
            </div>
        )
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
            menuId: id,
            name: newName,
            desc: newDesc,
            price: newPrice
        }
        dispatch(addPositionToMenu(newPosition));
    }

    return (
        <div>
            <h3>I am a menu ID:{id} named {menuName}!</h3>
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