import {useEffect, useRef} from "react";
import {apiKey} from "./apiKey";

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
        const addMarker = (position) => {
            new window.google.maps.Marker({
                position: {lat: Number(position.lat), lng: Number(position.lng)},
                map: map
            });
        }

        const addNewMarker = () => {
            let address = marker.replaceAll(' ', '%20');
            if (address) {
                return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
                    .then(r => r.json())
                    .then(r => {
                        addMarker(r.results[0].geometry.location);
                    });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        map = initGoogleMap();
        addMarker(center);
        addNewMarker();
    });



    return <div ref={ref} id="map" />;
}