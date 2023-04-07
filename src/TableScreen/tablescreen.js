import {useParams} from "react-router";
import './tablescreen.css'
import {useSelector} from "react-redux";
import {selectMenus} from "../Menus/menusSlice";
import {useState} from "react";

export const TableScreen = () => {
    let { id } = useParams();
    let menus = useSelector(selectMenus);
    const [currentMenu, setCurrentMenu] = useState(0);

    const handleMenuChange = (id) => {
        setCurrentMenu(id);
    }

    const renderMenuButtons = (menu) => {
        return (
            <button onClick={() => handleMenuChange(menu.id)}>{menu.name}</button>
        )
    }

    const renderMenuPositions = (menu) => {
        return (
            <div className="menuPosition">
                <div className="positionDescription">
                    <h3>{menu.name}</h3>
                    <p>{menu.desc}</p>
                </div>
                <div className="priceAndButton">
                    <h3>{menu.price}$</h3>
                    <button>+</button>
                </div>
            </div>
        )
    }

    return (
        <div id="tableScreen">
            <section id="tableName">
                <p>TABLE {id} !</p>
            </section>
            <section id="menuButtons">
                {menus.map(renderMenuButtons)}
            </section>
            <section id="menuListing">
                {menus[currentMenu].positions.map(renderMenuPositions)}
            </section>
            <section id="order">
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>note</button>
                        <button>-</button>
                    </div>
                </div>
                <div className="menuPosition">
                    <div className="positionDescription">
                        <h3>Ziemniaki</h3>
                    </div>
                    <div className="priceAndButton">
                        <h3>15.00$</h3>
                        <button>note</button>
                        <button>-</button>
                    </div>
                </div>
            </section>
            <section id="total">
                <h4>Total: 15.00$</h4>
            </section>
        </div>
    )
}