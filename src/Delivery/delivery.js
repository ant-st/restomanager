import {useSelector} from "react-redux";
import {selectOrders} from "./deliSlice";
import {Link} from "react-router-dom";

export const Delivery = () => {
    const delis = useSelector(selectOrders);

    const renderDelis = (deli) => {
        return (
            <div className = "deli">
                <h3>{deli.street}</h3>
                <h4>{deli.city}</h4>
                <p>{deli.total}</p>
            </div>
        )
    }

    return (
        <div id="delivery">
                <div id="delicreator">
                    <Link to='/delivery/new'><button>New delivery</button></Link>
                </div>
                <div id="deliList">
                    {delis.map(renderDelis)}
                </div>
        </div>
    )
}