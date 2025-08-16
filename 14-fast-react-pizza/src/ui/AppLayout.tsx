import { Outlet, useNavigation } from "react-router-dom";
import { CartOverview } from "../features/cart";
import { Header } from "./Header";
import { Loader } from "./Loader";

function AppLayout() {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading';

    return (
        <div className="layout">
            {isLoading && <Loader /> }
            <Header />
            <main>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    )
}

export { AppLayout }