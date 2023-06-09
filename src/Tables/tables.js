import './tables.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectTables} from "./tablesSlice";
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";

// const tablesArray = [{id: 1, name: 'Stol 1'}, {id: 2, name: 'Stolik 2'}, {id: 3, name: 'Kominek'}]

const renderTable = (table) => {
    return (
        <NavLink to={String(table.id)} className={`table ${!table.isServed ? 'Empty' : table.isReady ? 'Ready' : 'Preparing'}`} key={table.name}>
            <h3>{table.name}</h3>
            <div>
                {table.waiter && (
                    <p className="tableWaiter">{table.waiter.name}</p>
                )}
                <p className="tableStatus">{!table.isServed ? 'Wolny' : table.isReady ? 'Gotowe' : 'W przygotowaniu'}</p>
            </div>
        </NavLink>
    )
}

export const Tables = () => {
    const tables = useSelector(selectTables);
    const {active} = useSelector(selectLoggedUser);

    if (active) return (
        <div id="tablesGallery">
            {tables.map(renderTable)}
        </div>
    )
    else return <AccessDenied/>
}