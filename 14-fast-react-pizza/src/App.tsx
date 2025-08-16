import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout, Home, Error } from "./ui"
import { Menu } from "./features/menu"
import { Cart } from "./features/cart"
import { CreateOrder, Order } from "./features/order"
import { loader as menuLoader } from "./features/menu/menu-loader"
import { loader as orderLoader } from "./features/order/order-loader"
import { action as createOrderAction} from "./features/order/order-action"

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home />, },
            { path: '/menu', element: <Menu />, loader: menuLoader, errorElement: <Error /> },
            { path: '/cart', element: <Cart /> },
            { path: '/order/new', element: <CreateOrder />, action: createOrderAction},
            { path: '/order/:orderId', element: <Order />, loader: orderLoader, errorElement: <Error /> }
        ]
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export { App }
