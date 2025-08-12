import type { CityType } from '../types'
import styles from './CityList.module.css'
import { Message, Spinner } from './'
import { CityItem } from './CityItem'

type CityListProps = {
    cities: CityType[]
    isLoading: boolean
}

export function CityList({ cities, isLoading }: CityListProps) {

    if (isLoading) {
        return <Spinner />
    }

    if (!cities.length) {
        return <Message  message={'Add your first city by clicking a city on the map'}/>
    }

    return (
        <ul className={styles.cityList}>
            {cities.map(city => {
                return <CityItem key={city.id} city={city} />
            })}
        </ul>
    )
}