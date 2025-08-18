import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { createOrder } from '../../services'
import { isValidPhone } from '../../utils'
import type { CartItemType } from '../../types'
import { store } from '../../store'
import { clearCart } from '../cart/cart.slice'

async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const order = {
		address: formData.get('address') as string,
		customer: formData.get('customer') as string,
		phone: formData.get('phone') as string,
		priority: formData.get('priority') as string === 'on',
		cart: JSON.parse(formData.get('cart') as string)
	}

    console.log(order)

	const errors: { address?: string; customer?: string; phone?: string; priority?: boolean; cart?: CartItemType[] } =
		{}
	if (!isValidPhone(order.phone)) {
		errors.phone = 'Please give us your correct phone number. We might need it to contect you.'
	}

	if (Object.keys(errors).length > 0) return errors

	const newOrder = await createOrder(order)

    store.dispatch(clearCart())

	return redirect(`/order/${newOrder.id}`)
}

export { action }
