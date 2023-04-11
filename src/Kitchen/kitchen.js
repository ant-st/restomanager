import {useDispatch, useSelector} from "react-redux";
import {selectTables, toggleIsReady} from "../Tables/tablesSlice";

import './kitchen.css'

export const Kitchen = () => {
    const tables = useSelector(selectTables);
    const dispatch = useDispatch();

    const renderOrder = (order) => {
        if (!order.isReady) return (<li>
            <h3>{order.name}</h3>
            <h5>{order.note}</h5>
        </li>)
    }

    const renderTable = (table) => {
        if (table.order[0] && !table.isReady) {
            return (
                <div className="order">
                    <ol>
                    {table.order.map(renderOrder)}
                    </ol>
                    <button onClick={() => dispatch(toggleIsReady(table.id))}>Check!</button>
                </div>
            )
        }
    }

    return (
        <div id="kitchen">
            <h2>Oczekujące zamówienia:</h2>
            {tables.map(renderTable)}
        </div>
    )
}