import type { CartItemType } from '../../types'
import { formatCurrency } from '../../utils'

type OrderItemProps = {
	item: CartItemType
	isLoadingIngredients?: boolean
	ingredients?: [string]
}

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemProps) {
	const { quantity, name, totalPrice } = item
	console.log(isLoadingIngredients, ingredients)
	return (
		<li className='py-3'>
			<div className='flex items-center justify-between gap-4 text-sm'>
				<p>
					<span className='font-bold'>{quantity}&times;</span> {name}
				</p>
				<p className='font-bold'>{formatCurrency(totalPrice)}</p>
			</div>
		</li>
	)
}

export { OrderItem }
