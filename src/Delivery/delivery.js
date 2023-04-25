import {useDispatch, useSelector} from "react-redux";
import {selectOrders, toggleChecked, sendToKitchen, deleteOrder, sendDriver} from "./deliSlice";
import {Link} from "react-router-dom";
import './delivery.css'
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";
import {useState} from "react";

export const Delivery = () => {
    const delis = useSelector(selectOrders);
    const dispatch = useDispatch();
    const {active, manager} = useSelector(selectLoggedUser);
    const [driver, setDriver] = useState(null);

    const handleDriverChange = ({target}) => {
        setDriver(target.value);
    }

    const renderDelis = (deli) => {
        let status, style = undefined;
        if (deli.isChecked) {
            status = 'Zaznaczone';
            style = 'checked';
        }
        else if (deli.isReady) {
            status = 'Gotowe do drogi!';
            style = 'ready'
        }
        else if (deli.isSent) {
            status = 'Wysłane do kuchni';
            style = 'sent'
        }
        else status = 'Przyjęte';

        let orderTime = deli.orderTime;

        return (
            <div className ={"deli " + style} key={deli.street}>
                <h4>{deli.street}, {deli.city}</h4>
                <p>{deli.order.length} pozycji: {deli.total}$</p>
                <p>{deli.deliNote}</p>
                <p>Status: {status}</p>
                <p>{orderTime}</p>
                <button onClick = {() => dispatch(toggleChecked(deli.street))}>Zaznacz</button>
            </div>
        )
    }

    if (active) return (
        <div id="delivery">
                <div id="delicreator">
                    <Link to='/delivery/new'><button>Nowe zamówienie</button></Link>
                    <section>
                        <button onClick = {() => dispatch(sendToKitchen())}>Wyślij do kuchni</button>
                        <button disabled={!manager} onClick = {() => dispatch(deleteOrder())}>Usuń zamówienie</button>
                    </section>
                    <section>
                        <input type="number" onChange={handleDriverChange} min={1} placeholder="Numer kierowcy"/>
                        <button disabled={!driver} onClick = {() => dispatch(sendDriver(driver))}>Wyślij kierowcę</button>
                    </section>
                </div>
                <div id="deliList">
                    {delis.map(renderDelis)}
                </div>
        </div>
    )
    else return <AccessDenied/>
}