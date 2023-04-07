import './tables.css'
import {NavLink} from "react-router-dom";

const tablesArray = [{id: 1, name: 'Stol 1'}, {id: 2, name: 'Stolik 2'}, {id: 3, name: 'Kominek'}]

const renderTable = (table) => {
    return (
        <NavLink to={String(table.id)} className="table">
            <p>{table.name}</p>
        </NavLink>
    )
}

export const Tables = () => {
    return (
        <div id="tablesGallery">
            {tablesArray.map(renderTable)}
        </div>
    )
}