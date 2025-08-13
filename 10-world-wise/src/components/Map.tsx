import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { type LeafletMouseEvent } from 'leaflet';
import { useCities, useGeolocation, useUrlPosition } from '../hooks';
import { Button } from './';

export function Map() {

    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
    const { cities } = useCities();
    const [mapLat, mapLng] = useUrlPosition();

    const firstPosition: [number, number] = cities.length > 0
        ? [cities[0].position.lat, cities[0].position.lng]
        : [0, 0];
    const [mapPosition, setMapPosition] = useState<[number, number]>(firstPosition)

    useEffect(() => {
        if (cities.length > 0) {
            setMapPosition([cities[0].position.lat, cities[0].position.lng]);
        }
    }, [cities]);

    useEffect(() => {
        if (!Number.isNaN(mapLat) && !Number.isNaN(mapLng)) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer} >
            {!geolocationPosition && (
                <Button type={`position`} onClick={getPosition} buttonType='button'>
                    {isLoadingPosition ? 'Loading position...' : 'Use your position'}
                </Button>
            )}
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => {
                    return (
                        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                            <Popup>
                                <span>{city.cityName}</span>
                                <span>{city.notes}</span>
                            </Popup>
                        </Marker>
                    )
                })}
                <ChangeCenter position={mapPosition || [mapLat || 11, mapLng || 106]} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position, map.getZoom(), { animate: true });

    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e: LeafletMouseEvent) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    })
    return null;
}