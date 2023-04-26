import {useEffect, useRef} from "react";

export const MapComponent = ({
                            center,
                            zoom,
                        }: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) => {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div ref={ref} id="map" />;
}