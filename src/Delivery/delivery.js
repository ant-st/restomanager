import {useDispatch, useSelector} from "react-redux";
import {selectOrders, toggleChecked, sendToKitchen} from "./deliSlice";
import {Link} from "react-router-dom";
import './delivery.css'

export const Delivery = () => {
    const delis = useSelector(selectOrders);
    const dispatch = useDispatch();

    const renderDelis = (deli) => {
        let status;
        if (deli.isReady) status = 'Gotowe!';
        else if (deli.isSent) status = 'Wysłane do kuchni';
        else if (deli.isChecked) status = 'Zaznaczone';
        else status = 'Przyjęte';

        return (
            <div className = "deli">
                <h4>{deli.street}, {deli.city}</h4>
                <p>{deli.order.length} pozycji: {deli.total}$</p>
                <p>{deli.note}</p>
                <p>Status: {status}</p>
                <button onClick = {() => dispatch(toggleChecked(deli.street))}>Check</button>
            </div>
        )
    }

    return (
        <div id="delivery">
                <div id="delicreator">
                    <Link to='/delivery/new'><button>New delivery</button></Link>
                    <button onClick = {() => dispatch(sendToKitchen())}>Send to kitchen</button>
                </div>
                <div id="deliList">
                    {delis.map(renderDelis)}

                </div>
        </div>
    )
}