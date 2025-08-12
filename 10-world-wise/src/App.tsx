import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, Homepage, Login, PageNotFound, Pricing, Product } from "./pages";
import { City, CityList, CountryList, Form } from "./components";
import { useEffect, useState } from "react";
import type { CityType } from "./types";

const BASE_URL = 'http://localhost:9000'

export function App() {
    const [cities, setCities] = useState<CityType[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to='cities' />} />
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
