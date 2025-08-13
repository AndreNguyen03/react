import styles from './CountryList.module.css'
import { CountryItem, Message, Spinner } from './'
import { useCities } from '../hooks';

export function CountryList() {

    const { cities, isLoading } = useCities();

    if (isLoading) {
        return <Spinner />
    }

    if (!cities.length) {
        return <Message message={'Add your first city by clicking a city on the map'} />
    }

    const countries = Array.from(
        new Map(
            cities.map(city => [city.country, { country: city.country, emoji: city.emoji }])
        ).values()
    );

    return (
        <ul className={styles.countryList}>
            {countries.map(country => {
                return <CountryItem key={country.country} country={country} />
            })}
        </ul>
    )
}