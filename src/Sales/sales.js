import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSales, selectFilteredSales, setSalesFilter} from "./salesSlice";

export const Sales = () => {
    const dispatch = useDispatch();
    const sales = useSelector(selectFilteredSales);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState({
        delis: true,
        tables: true
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
            </tr>
        )
    }



    return (
        <div id="salesTable">
            Sales
            <div id="filters">
                <label>
                    <input type="checkbox" defaultChecked={true} onChange={() => {setFilter((prev) => {
                                return {
                                ...prev,
                                delis: !prev.delis
                                }
                           })}}/>
                    Dostawy
                </label>
                <label>
                    <input type="checkbox" defaultChecked={true} onChange={() => {setFilter((prev) => {
                            return {
                                ...prev,
                                tables: !prev.tables
                            }
                        })}}/>
                    W lokalu
                </label>
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
                    </tr>
                </thead>
                <tbody>
                    {sales && sales.map(renderRow)}
                </tbody>
            </table>
            <h3>Total: {total}</h3>
        </div>
    )
}