import {useDispatch, useSelector} from "react-redux";
import {addTable, deleteTable, selectTables} from "../Tables/tablesSlice";
import {useState} from "react";

export const Settings = () => {
    const tables = useSelector(selectTables);
    const dispatch = useDispatch();

    const [newName, setNewName] = useState('');

    const renderTables = (table) => {
        return (
                <li key={'table ' + table.name}>{table.name} <button onClick = {() => dispatch(deleteTable(table.id))}>X</button></li>
        )
    }

    const handleNameChange = ({target}) => {
        setNewName(target.value);
    }

    const submitNameChange = () => {
        dispatch(addTable(newName));
    }

    return (
        <div id="settings">
            <section id="tableEditor">
                <h2>Edycja stolików:</h2>
                <ol id="tablesList">
                    {tables.map(renderTables)}
                </ol>
                <input onChange={handleNameChange}/>
                <button onClick={submitNameChange}>Add!</button>
            </section>
        </div>
    )
}