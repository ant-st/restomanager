import {useNavigate, useParams} from "react-router";
import './tablescreen.css'
import {useDispatch, useSelector} from "react-redux";
import {selectMenus} from "../Menus/menusSlice";
import {useEffect, useState} from "react";
import {finalizeOrder, selectTables, submitOrder} from "../Tables/tablesSlice";
import {Link} from "react-router-dom";

export const TableScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { id } = useParams();

    let menus = useSelector(selectMenus);
    const tables = useSelector(selectTables);

    const [currentMenu, setCurrentMenu] = useState({});
    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentSum, setCurrentSum] = useState(0);
    const [currentPay, setCurrentPay] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculating total sum:
    useEffect( () => {
        if (currentOrder) setCurrentSum(currentOrder.reduce((sum, current) => sum + Number(current.price),0));
    },[currentOrder]);

    const fetchTable = () => {
        for (let i=0; i<tables.length; i++)
            if (tables[i].id === Number(id)) {
                setIsSubmitted(tables[i].isServed)
                setCurrentOrder(tables[i].order);
            }
    }

    useEffect(fetchTable, [tables, id])

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

        if (Number(currentSum) !== 0) {
            dispatch(submitOrder({id: id, order: currentOrder, orderTime: new Date().toLocaleTimeString()}));
            navigate('/tables');
        }


    }

    const handleFinalizeOrder = () => {
        if (isSubmitted && currentPay) {
            dispatch(finalizeOrder({
                id: id,
                price: currentSum,
                payment: currentPay
            }));
            navigate('/tables');
        }
    }

    const renderMenuButtons = (menu) => {
        return (
            <button key={menu.name + ' button'} onClick={() => handleMenuChange(menu)}>{menu.name}</button>
        )
    }

    const renderMenuPositions = (menu) => {
        return (
            <div className="menuPosition" key={menu.name}>
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
            <div className="menuPosition" key={'order ' + menu.name}>
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

    const handleMethodChange = ({target}) => {
        setCurrentPay(target.value)
    }

    return (
        <div id="tableScreen">
            <section id="tableName">
                <p>Stół - ID: {id}</p>
                <Link to={'/tables'}>Go back</Link>
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
                <select defaultValue="" onChange={handleMethodChange}>
                    <option value="">Metoda płatności:</option>
                    <option value="cash">Gotówka</option>
                    <option value="card">Karta</option>
                    <option value="online">Zapłacono on-line</option>
                </select>
                <button onClick={handleSubmitOrder}>Submit order</button>
                <button onClick={handleFinalizeOrder}>Finalize order</button>
            </section>
        </div>
    )
}