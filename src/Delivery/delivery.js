import {useDispatch, useSelector} from "react-redux";
import {selectOrders, toggleChecked, sendToKitchen, deleteOrder, sendDriver} from "./deliSlice";
import {Link} from "react-router-dom";
import './delivery.css'
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";

export const Delivery = () => {
    const delis = useSelector(selectOrders);
    const dispatch = useDispatch();
    const {active} = useSelector(selectLoggedUser);

    const renderDelis = (deli) => {
        let status;
        if (deli.isChecked) status = 'Zaznaczone';
        else if (deli.isReady) status = 'Gotowe do drogi!';
        else if (deli.isSent) status = 'Wysłane do kuchni';
        else status = 'Przyjęte';

        let orderTime = deli.orderTime;

        return (
            <div className = "deli" key={deli.street}>
                <h4>{deli.street}, {deli.city}</h4>
                <p>{deli.order.length} pozycji: {deli.total}$</p>
                <p>{deli.deliNote}</p>
                <p>Status: {status}</p>
                <p>{orderTime}</p>
                <button onClick = {() => dispatch(toggleChecked(deli.street))}>Check</button>
            </div>
        )
    }

    if (active) return (
        <div id="delivery">
                <div id="delicreator">
                    <Link to='/delivery/new'><button>New delivery</button></Link>
                    <button onClick = {() => dispatch(sendToKitchen())}>Send to kitchen</button>
                    <button onClick = {() => dispatch(sendDriver())}>Send Driver</button>
                    <button onClick = {() => dispatch(deleteOrder())}>Delete</button>
                </div>
                <div id="deliList">
                    {delis.map(renderDelis)}

                </div>
        </div>
    )
    else return <AccessDenied/>
}