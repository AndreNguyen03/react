import { useEffect, useState } from "react";
import type { WatchedMovie } from "../types";

export function useLocalStorageState(initialState: WatchedMovie[], key: string) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        if (!storedValue) return;
        return JSON.parse(storedValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}