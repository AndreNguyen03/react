import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, Homepage, Login, PageNotFound, Pricing, Product, ProtectedRoute } from "./pages";
import { City, CityList, CountryList, Form } from "./components";
import { AuthProvider, CitiesProvider } from "./contexts";

// import { lazy, Suspensse } from 'react';

// const AppLayout = lazy(() => import('./pages/AppLayout'))


// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-BB-66-7r.css   30.27 kB │ gzip:   5.06 kB
// dist/assets/index-CsuTzFPq.js   560.64 kB │ gzip: 165.77 kB

export function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="login" element={<Login />} />
                        <Route path="app" element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate replace to='cities' />} />
                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
}
