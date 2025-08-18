import { Form, useActionData, useNavigation } from 'react-router-dom'
import { Button } from '../../ui'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCart, getTotalCartPrice } from '../cart/cart.slice'
import { EmptyCart } from '../cart/EmptyCart'
import { formatCurrency } from '../../utils'
import { useState } from 'react'
import { fetchAddress } from '../user/user.slice'

function CreateOrder() {
	const [withPriority, setWithPriority] = useState<boolean>(false)
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	const formErrors = useActionData()
	const {
		username,
		status: addressStatus,
		position,
		address,
		error: errorAddress
	} = useAppSelector((state) => state.user)
	const isLoadingAddress = addressStatus === 'loading'

	const dispatch = useAppDispatch()
	const cart = useAppSelector(getCart)
	const totalCartPrice = useAppSelector(getTotalCartPrice)
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
	const totalPrice = totalCartPrice + priorityPrice

	if (!cart.length) return <EmptyCart />

	return (
		<div className='px-4 py-6'>
			<h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

			<Form method='POST' action='/order/new'>
				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>First Name</label>
					<input type='text' name='customer' required className='input grow' defaultValue={username} />
				</div>

				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>Phone number</label>
					<div className='grow'>
						<input type='tel' name='phone' required className='input w-full' />
						{formErrors?.phone && (
							<p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>{formErrors.phone}</p>
						)}
					</div>
				</div>

				<div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>Address</label>
					<div className='grow'>
						<input
							type='text'
							name='address'
							disabled={isLoadingAddress}
							defaultValue={address}
							required
							className='input w-full'
						/>
						{addressStatus === 'error' && (
							<p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>{errorAddress}</p>
						)}
					</div>
					{!position.latitude && !position.longitude && (
						<span className='absolute bottom-[39%] right-[3px] z-50 sm:right-[3px] sm:top-[3px] md:right-[5px] md:top-[5px]'>
							<Button
								disabled={isLoadingAddress}
								type='small'
								onClick={(event) => {
									event?.preventDefault()
									dispatch(fetchAddress())
								}}
							>
								Get position
							</Button>
						</span>
					)}
				</div>

				<div className='mb-12 flex items-center gap-5'>
					<input
						className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
						type='checkbox'
						name='priority'
						id='priority'
						checked={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label className='font-medium' htmlFor='priority'>
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type='hidden' name='cart' value={JSON.stringify(cart)} />
					<input
						type='hidden'
						name='position'
						value={
							position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ''
						}
					/>
					<Button type='primary' disabled={isSubmitting || isLoadingAddress}>
						{isSubmitting ? 'Placing order....' : `Order now from ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	)
}

export { CreateOrder }
