import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSales, selectFilteredSales, setSalesFilter} from "./salesSlice";
import {selectLoggedUser} from "../users/usersSlice";
import {AccessDenied} from "../users/AccessDenied";

export const Sales = () => {
    const dispatch = useDispatch();
    const sales = useSelector(selectFilteredSales);
    const {manager} = useSelector(selectLoggedUser);

    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState({
        delis: true,
        tables: true,
        date: null,
        searchTerm: '',
        payment: '',
        user: null,
        driver: null
    });

    useEffect(() => {
        dispatch(fetchSales());
    }, [dispatch]);

    useEffect(() => {
        setTotal(sales.reduce((sum, row) => sum + Number(row.price), 0));
    }, [sales]);

    useEffect(() => {
        dispatch(setSalesFilter(filter));
    },[filter, dispatch]);

    const handleDateChange = ({target}) => {
        setFilter({
                ...filter,
                date: target.value ? new Date(target.value).toLocaleDateString('en-GB') : null,
            }
        );
    }

    const handleSearchTermChange = ({target}) => {
        setFilter({
                ...filter,
                searchTerm: target.value
            }
        );
    }

    const handleMethodChange = ({target}) => {
        setFilter({
                ...filter,
                payment: target.value
            });
    }

    const handleUserChange = ({target}) => {
        setFilter({
            ...filter,
            user: target.value
        });
    }

    const handleDriverChange = ({target}) => {
        setFilter({
            ...filter,
            driver: target.value
        });
    }

    const handleReset = () => {
        setFilter({
                ...filter,
                date: null,
                searchTerm: '',
                payment: '',
                user: null,
                driver: null
            }
        )
    }


    const renderRow = (row) => {
        return (
            <tr key = {'row ' + row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.name}</td>
                <td>{row.date}</td>
                <td>{row.orderTime}</td>
                <td>{row.closingTime}</td>
                <td>{row.price}</td>
                <td>{row.payment}</td>
                <td>{row.user}</td>
                <td>{row.driver}</td>
            </tr>
        )
    }



    if (manager) return (
        <div id="salesTable">
            Sales
            <div id="filters">
                <label>
                    <input type="checkbox" defaultChecked={true} onChange={() => {setFilter({
                                ...filter,
                                delis: !filter.delis
                                }
                           )}}/>
                    Dostawy
                </label>
                <label>
                    <input type="checkbox" defaultChecked={true} onChange={() => {setFilter({
                                ...filter,
                                tables: !filter.tables
                            }
                        )}}/>
                    W lokalu
                </label>
                <input type="date" onChange={handleDateChange} defaultValue={null}/>
                <input type="text" onChange={handleSearchTermChange} placeholder={'Filtruj wg telefonu/stolika'}/>
                <select defaultValue="" onChange={handleMethodChange} placeholder={'Metoda płatności'}>
                    <option value="">Wszystko</option>
                    <option value="cash">Gotówka</option>
                    <option value="card">Karta</option>
                    <option value="online">Zapłacono on-line</option>
                </select>
                <input type="number" onChange={handleUserChange} min={0} placeholder={'ID Pracownika'}/>
                <input type="number" onChange={handleDriverChange} min={0} placeholder={'ID dostawcy'}/>
                <button onClick={handleReset} value={''}>Reset filters</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rodzaj</th>
                        <th>Telefon/Stolik</th>
                        <th>Data</th>
                        <th>Godzina przyjecia</th>
                        <th>Godzina wydania</th>
                        <th>Kwota</th>
                        <th>Metoda</th>
                        <th>Pracownik</th>
                        <th>Dostawca</th>
                    </tr>
                </thead>
                <tbody>
                    {sales && sales.map(renderRow)}
                </tbody>
            </table>
            <h3>Total: {total}</h3>
        </div>
    )
    else return <AccessDenied/>
}