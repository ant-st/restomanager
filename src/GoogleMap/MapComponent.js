import {useEffect, useRef} from "react";

export const MapComponent = ({center, zoom, marker}) => {
    const ref = useRef();
    let map = null;

    useEffect(() => {
        const initGoogleMap = () => {
            return new window.google.maps.Map(ref.current, {
                center,
                zoom,
            });
        }
        const addCentralMarker = () => {
            new window.google.maps.Marker({
                position: {lat: Number(center.lat), lng: Number(center.lng)},
                map: map
            });
        }

        map = initGoogleMap();
        addCentralMarker();
    });

    return <div ref={ref} id="map" />;
}