import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {MapComponent} from "./MapComponent";
import {apiKey} from "./apiKey";
import {useSelector} from "react-redux";
import {selectCenter} from "./mapSlice";
import {memo} from "react";

export const GMapWrapper = memo(function GMapWrapper({newMarker}) {

    const center = useSelector(selectCenter);
    const zoom = 11;

    const render = (status) => {
        switch (status) {
            default:
                return <h3>Loading</h3>;
            case Status.FAILURE:
                return <h3>Error!</h3>;
            case Status.SUCCESS:
                return <MapComponent center={center} zoom={zoom} marker = {newMarker}/>;
        }
    };

    return <Wrapper apiKey={apiKey} render={render} />;
});