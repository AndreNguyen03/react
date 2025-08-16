import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { createOrder } from "../../services";

async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    console.log(data)

    const order = {
        ...data,
        cart: typeof data.cart === "string" ? JSON.parse(data.cart) : [],
        priority: data.priority === 'on'
    }

    const newOrder = await createOrder(order)

    return redirect(`/order/${newOrder.id}`)
}

export { action }
