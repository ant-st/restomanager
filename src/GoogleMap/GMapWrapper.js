import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {MapComponent} from "./MapComponent";
import {apiKey} from "./apiKey";
import {useSelector} from "react-redux";
import {selectCenter} from "./mapSlice";

export const GMapWrapper = () => {

    const center = useSelector(selectCenter);
    const zoom = 13;

    const render = (status) => {
        switch (status) {
            default:
                return <h3>Loading</h3>;
            case Status.FAILURE:
                return <h3>Error!</h3>;
            case Status.SUCCESS:
                return <MapComponent center={center} zoom={zoom}/>;
        }
    };

    return <Wrapper apiKey={apiKey} render={render} />;
}