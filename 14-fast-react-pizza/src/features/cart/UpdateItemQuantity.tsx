import { useAppDispatch } from '../../store'
import { Button } from '../../ui'
import { decreateItemQuantity, increateItemQuantity } from './cart.slice'

function UpdateItemQuantity({ currentQuantity, pizzaId }: {currentQuantity: number, pizzaId: number }) {

    const dispatch = useAppDispatch()

	return (
		<div className='flex gap-1 items-center md:gap-3'>
			<Button type='round' onClick={() => dispatch(decreateItemQuantity(pizzaId))}>-</Button>
            <span className='text-sm font-medium'>{currentQuantity}</span>
			<Button type='round' onClick={() => dispatch(increateItemQuantity(pizzaId))}>+</Button>
		</div>
	)
}

export { UpdateItemQuantity }
