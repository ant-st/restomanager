import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {MapComponent} from "./MapComponent";
import {apiKey} from "./apiKey";


const center = { lat: -34.397, lng: 150.644 };
const zoom = 4;


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

export const GMapWrapper = () => <Wrapper apiKey={apiKey} render={render} />;