import { useState } from "react";

function useGeolocation(defaultPosition: { lat: number; lng: number } | null = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(defaultPosition);
    const [error, setError] = useState<string | null>(null);

    function getPosition() {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (err) => {
                setError(err.message);
                setIsLoading(false);
            }
        );
    }

    return { isLoading, position, error, getPosition };
}

export { useGeolocation };