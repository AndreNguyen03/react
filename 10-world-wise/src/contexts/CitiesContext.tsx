import { createContext, useEffect, useReducer } from "react";
import type { CityType } from "../types.ts";

type CitiesContextType = {
    cities: CityType[];
    isLoading: boolean;
    currentCity: CityType | null;
    error: string;
    getCityById: (id: string) => Promise<void>;
    createCity: (newCity: CityType) => Promise<void>
    deleteCity: (id: string) => Promise<void>
};

type State = {
    cities: CityType[],
    isLoading: boolean,
    currentCity: CityType | null,
    error: string
}

type Action =
    | { type: 'cities/loaded', payload: CityType[] }
    | { type: 'cities/created', payload: CityType }
    | { type: 'cities/deleted', payload: string }
    | { type: 'loading' }
    | { type: 'rejected', payload: string }
    | { type: 'city/loaded', payload: CityType }

const CitiesContext = createContext<CitiesContextType | null>(null);

const BASE_URL = 'http://localhost:9000'

const initState: State = {
    cities: [],
    isLoading: false,
    currentCity: null,
    error: ''
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'cities/loaded':
            return {
                ...state, isLoading: false, cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state, isLoading: false, currentCity: action.payload
            }
        case 'cities/created':
            return {
                ...state, isLoading: false, cities: [...state.cities, action.payload]
            }
        case 'cities/deleted':
            return {
                ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)
            }
        case 'rejected':
            return {
                ...state, error: action.payload
            }
        default:
            throw new Error(`unknown action type`)
    }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
    /**
     * Move to useReducer
     */
    // const [cities, setCities] = useState<CityType[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState<CityType | null>(null);

    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({ type: 'loading' })
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data })
            } catch (error) {
                dispatch({ type: 'rejected', payload: (error as Error).message })
            }
        }

        fetchCities();
    }, [])

    async function getCityById(id: string) {
        if (id === currentCity?.id) return;

        try {
            dispatch({ type: 'loading' })
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data })
        } catch (error) {
            dispatch({ type: 'rejected', payload: (error as Error).message })
        }
    }

    async function createCity(newCity: CityType) {
        try {
            dispatch({ type: 'loading' })
            newCity.id = Math.floor(10000000 + Math.random() * 90000000).toString();
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json()
            dispatch({ type: 'cities/created', payload: data })
        } catch (error) {
            dispatch({ type: 'rejected', payload: (error as Error).message })
        }
    }

    async function deleteCity(id: string) {
        try {
            dispatch({ type: 'loading' })
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({ type: 'cities/deleted', payload: id })
        } catch (error) {
            dispatch({ type: 'rejected', payload: (error as Error).message })
        }
    }


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, error, createCity, deleteCity, getCityById }}>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesProvider, CitiesContext }