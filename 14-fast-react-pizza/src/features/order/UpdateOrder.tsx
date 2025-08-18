import { useFetcher } from 'react-router-dom'
import { Button } from '../../ui'

function UpdateOrder() {
	const fetcher = useFetcher()

	return (
		<fetcher.Form method='PATCH' className='text-right'>
			<Button type='primary'>Make priority</Button>
		</fetcher.Form>
	)
}

export { UpdateOrder }
