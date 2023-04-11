import './tables.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectTables} from "./tablesSlice";

// const tablesArray = [{id: 1, name: 'Stol 1'}, {id: 2, name: 'Stolik 2'}, {id: 3, name: 'Kominek'}]

const renderTable = (table) => {
    return (
        <NavLink to={String(table.id)} className={`table ${!table.isServed ? 'Empty' : table.isReady ? 'Ready' : 'Preparing'}`} >
            <p>{table.name}</p>
            <p>{!table.isServed ? 'Empty' : table.isReady ? 'Ready' : 'Preparing'}</p>
        </NavLink>
    )
}

export const Tables = () => {
    const tables = useSelector(selectTables);

    return (
        <div id="tablesGallery">
            {tables.map(renderTable)}
        </div>
    )
}