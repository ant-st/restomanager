import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSales, selectSales} from "./salesSlice";

export const Sales = () => {
    const dispatch = useDispatch();
    const sales = useSelector(selectSales);

    useEffect(() => {
        dispatch(fetchSales());
    }, []);

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
        </div>
    )
}