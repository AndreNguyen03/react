import { useAppDispatch, useAppSelector } from '../../store'
import { Button, LinkButton } from '../../ui'
import { clearCart, getCart } from './cart.slice'
import { CartItem } from './CartItem'
import { EmptyCart } from './EmptyCart'

// const fakeCart: CartItemType[] = [
// 	{
// 		pizzaId: 12,
// 		name: 'Mediterranean',
// 		quantity: 2,
// 		unitPrice: 16,
// 		totalPrice: 32
// 	},
// 	{
// 		pizzaId: 6,
// 		name: 'Vegetale',
// 		quantity: 1,
// 		unitPrice: 13,
// 		totalPrice: 13
// 	},
// 	{
// 		pizzaId: 11,
// 		name: 'Spinach and Mushroom',
// 		quantity: 1,
// 		unitPrice: 15,
// 		totalPrice: 15
// 	}
// ]

function Cart() {
	const cart = useAppSelector(getCart)
    const username = useAppSelector(state => state.user.username)
    const dispatch = useAppDispatch()

    if(cart.length === 0) return <EmptyCart />

	return (
		<div className='px-4 py-3'>
			<LinkButton to='/menu'>&larr; Back to menu</LinkButton>

			<h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

			<ul className='divide-y divide-stone-200 mt-3 border-b'>
				{cart.map((item) => {
					return <CartItem item={item} key={item.pizzaId} />
				})}
			</ul>

			<div className='mt-6 space-x-2'>
				<Button type='primary' to='/order/new'>
					Order pizzas
				</Button>
                <Button type='secondary' onClick={() => dispatch(clearCart())}>
                    Clear cart
                </Button>
			</div>
		</div>
	)
}

export { Cart }
