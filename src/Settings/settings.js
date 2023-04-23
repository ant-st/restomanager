import {useDispatch, useSelector} from "react-redux";
import {addTable, deleteTable, selectTables} from "../Tables/tablesSlice";
import {useState} from "react";
import {addUser, selectLoggedUser, selectUsers, toggleActiveUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";
import './settings.css'

export const Settings = () => {
    let tables = useSelector(selectTables);
    const users = useSelector(selectUsers);
    const {admin} = useSelector(selectLoggedUser);

    const dispatch = useDispatch();

    const [newName, setNewName] = useState('');

    const [newUser, setNewUser] = useState({
        name: '',
        password: '',
        admin: false,
        manager: false,
        active: true
    });

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
    const renderUser = (row) => {
        return (
            <tr key = {'row ' + row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td className="passwordCell"><span>{row.password}</span></td>
                <td>{row.admin ? '1' : '0'}</td>
                <td>{row.manager ? '1' : '0'}</td>
                <td>{row.active ? '1' : '0'}</td>
                {!row.admin && (
                    <td><input type='checkbox' defaultChecked={row.active} onClick={() => dispatch(toggleActiveUser(row.id))}/></td>
                    )}
            </tr>
        )
    }

    const handleUsernameChange = ({target}) => {
        setNewUser({...newUser, name: target.value});
    }

    const handlePassChange = ({target}) => {
        setNewUser({...newUser, password: target.value});
    }


    const handleManagerChange = () => {
        setNewUser({...newUser, manager: !newUser.manager});
    }
    const handleActiveChange = () => {
        setNewUser({...newUser, active: !newUser.active});
    }

    const submitNewUser = () => {
        dispatch(addUser(newUser));
    }

    const handleRestart = () => {
        // eslint-disable-next-line no-restricted-globals
        fetch('http://localhost:4000/restart').then(location.reload());
    }

    if (admin) return (
        <div id="settings">
            <p>Tylko w wersji próbnej - <button onClick={handleRestart}>RESTART</button></p>
            <section id="tableEditor">
                <h2>Edycja stolików:</h2>
                <ol id="tablesList">
                    {tables.map(renderTables)}
                </ol>
                <input onChange={handleNameChange}/>
                <button onClick={submitNameChange}>Add!</button>
            </section>
            <section id="usersEditor">
                <h2>Edycja użytkowników:</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Użytkownik</th>
                        <th>Hasło</th>
                        <th>Admin</th>
                        <th>Manager</th>
                        <th>Aktywny</th>
                        <th>Aktywuj!</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users && users.map(renderUser)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input defaultValue="Nowy user" onChange={handleUsernameChange}/></td>
                            <td><input type="password" defaultValue="Hasło" onChange={handlePassChange}/></td>
                            <td></td>
                            <td><input type="checkbox" onChange={handleManagerChange}/></td>
                            <td><input type="checkbox" defaultChecked={true} onChange={handleActiveChange}/></td>
                            <td><button onClick={submitNewUser}>Dodaj!</button></td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </div>
    )
    else return <AccessDenied/>
}