import { useAppDispatch } from '../../store'
import { Button } from '../../ui'
import { deleteItem } from './cart.slice'

function DeleteItem({ pizzaId }: { pizzaId: number }) {
	const dispatch = useAppDispatch()

	return (
		<Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>
			Delete
		</Button>
	)
}

export { DeleteItem }
