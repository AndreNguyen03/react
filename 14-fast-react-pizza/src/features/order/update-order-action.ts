import type { ActionFunctionArgs } from 'react-router-dom'
import { updateOrder } from '../../services';

export async function action({ params }: ActionFunctionArgs) {
	const data = { priority: true };
    if(params.orderId) await updateOrder(params.orderId, data)

	return null
}
