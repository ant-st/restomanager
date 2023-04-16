import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectMenus} from "../Menus/menusSlice";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addOrder} from "../Delivery/deliSlice";

import './deliveryScreen.css'

export const DeliveryScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let menus = useSelector(selectMenus);

    const [currentMenu, setCurrentMenu] = useState({});
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentSum, setCurrentSum] = useState(0);

    const [currentAdd, setCurrentAdd] = useState('');
    const [currentCity, setCurrentCity] = useState('Wroclaw');
    const [currentPhone, setCurrentPhone] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const [currentMethod, setCurrentMethod] = useState('cash');

    // Calculating total sum:
    useEffect( () => {
        if (currentOrder) setCurrentSum(currentOrder.reduce((sum, current) => sum + Number(current.price),0));
    },[currentOrder]);

    const handleMenuChange = (menu) => {
        setCurrentMenu(menu);
    }

    const handleAddingToOrder = (object) => {
        if (currentOrder) setCurrentOrder(prev => {
            return [...prev, {name: object.name, price: object.price, note: '', isReady: false}]
        });
        else setCurrentOrder([{name: object.name, price: object.price, note: '', isReady: false}])
    }

    const handleRemoveFromOrder = (object) => {
        let newOrder = currentOrder.filter((element) => element !== object.menu);
        setCurrentOrder(newOrder);
    }

    const handleSubmitOrder = () => {
        if (currentAdd && currentCity && currentPhone && currentSum) {
            dispatch(addOrder({
                street: currentAdd,
                city: currentCity,
                phone: currentPhone,
                deliNote: currentNote,
                order: currentOrder,
                total: currentSum,
                isSent: false,
                isReady: false,
                isChecked: false,
                paymentMet: currentMethod
            }));
            navigate('/delivery');
        }
    }

    const handleMethodChange = ({target}) => {
        setCurrentMethod(target.value);
    }

    const renderMenuButtons = (menu) => {
        return (
            <button onClick={() => handleMenuChange(menu)}>{menu.name}</button>
        )
    }

    const renderMenuPositions = (menu) => {
        return (
            <div className="menuPosition">
                <div className="positionDescription">
                    <h3>{menu.name}</h3>
                    <p>{menu.description}</p>
                </div>
                <div className="priceAndButton">
                    <h3>{menu.price}$</h3>
                    <button onClick={() => handleAddingToOrder({name: menu.name, price: menu.price})}>+</button>
                </div>
            </div>
        )
    }

    const renderOrder = (menu) => {
        return (
            <div className="menuPosition">
                <div className="positionDescription">
                    <h3>{menu.name}</h3>
                    <textarea onChange={({target}) => {menu.note = target.value}} defaultValue={menu.note ? menu.note : 'Add note'}>
                    </textarea>
                </div>
                <div className="priceAndButton">
                    <h3>{menu.price}$</h3>
                    <button onClick={() => handleRemoveFromOrder({menu})}>-</button>
                </div>
            </div>
        )
    }

    return (
        <div id="deliScreen">
            <section id="deliName">
                <p>Nowa dostawa</p>
            </section>
            <section id="menuButtons">
                {menus.map(renderMenuButtons)}
            </section>
            <section id="menuListing">
                {currentMenu.positions && currentMenu.positions.map(renderMenuPositions)}
            </section>
            <section id="order">
                {currentOrder && currentOrder.map(renderOrder)}
            </section>
            <section id="total">
                <h4>Total: {currentSum}$</h4>
            </section>
            <section id="buttons">
                <button onClick={handleSubmitOrder} >Save order</button>
                <Link to={'/delivery'}>Go back</Link>
            </section>
            <section id="address">
                <textarea defaultValue="Street" onChange={({target}) => setCurrentAdd(target.value)}></textarea>
                <textarea defaultValue="Wrocław" onChange={({target}) => setCurrentCity(target.value)}></textarea>
                <textarea defaultValue="Phone" onChange={({target}) => setCurrentPhone(target.value)}></textarea>
                <textarea defaultValue="deliNote" onChange={({target}) => setCurrentNote(target.value)}></textarea>
                <select onChange={handleMethodChange}>
                    <option selected={true} value="cash">Gotówka</option>
                    <option value="card">Karta</option>
                    <option value="online">Zapłacono on-line</option>
                </select>
            </section>
        </div>
    )
}