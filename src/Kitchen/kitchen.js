import {useDispatch, useSelector} from "react-redux";
import {selectTables, toggleIsReady} from "../Tables/tablesSlice";

import './kitchen.css'
import {selectSentOrders, toggleReady} from "../Delivery/deliSlice";
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";

export const Kitchen = () => {
    const tables = useSelector(selectTables);
    const deliOrders = useSelector(selectSentOrders);
    const {active} = useSelector(selectLoggedUser);
    const dispatch = useDispatch();

    const renderOrder = (order) => {
        if (!order.isReady || order.street) return (<li key={order.name}>
            <h3>{order.name}</h3>
            <h5>{order.note}</h5>
        </li>)
    }

    const renderTable = (table) => {
        if (table.order[0] && !table.isReady) {
            return (
                <div className="order" key={'order ' + table.id}>
                    <ol>
                    {table.order.map(renderOrder)}
                    </ol>
                    <button onClick={() => dispatch(toggleIsReady(table.id))}>Gotowe!</button>
                </div>
            )
        }
    }

    const renderDelivery = (deli) => {
        if (deli.order[0] && !deli.isReady) {
            return (
                <div className="order" key={'order ' + deli.street}>
                    <ol>
                        {deli.order.map(renderOrder)}
                    </ol>
                    <button onClick={() => dispatch(toggleReady(deli.street))}>Gotowe!</button>
                </div>
            )
        }
    }

    if (active) return (
        <div id="kitchen">
            <h2>Oczekujące zamówienia:</h2>
            {tables.map(renderTable)}
            <h2>Oczekujące dostawy:</h2>
            {deliOrders.map(renderDelivery)}
        </div>
    )
    else return <AccessDenied/>
}