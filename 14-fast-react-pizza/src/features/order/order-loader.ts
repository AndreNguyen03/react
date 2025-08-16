import type { LoaderFunctionArgs } from "react-router-dom"
import { getOrder } from "../../services"

async function loader({ params }: LoaderFunctionArgs) {
    const { orderId } = params
    if (!orderId) return ;
    const order = await getOrder(orderId)
    return order;
}

export { loader }