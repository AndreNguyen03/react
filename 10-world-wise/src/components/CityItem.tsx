import { Link } from "react-router-dom";
import type { CityType } from "../types";
import styles from "./CityItem.module.css";
import { useCities } from "../hooks";


const formatDate = (date: string | null) => {
    if (!date) return null;
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
}

export function CityItem({ city }: { city: CityType }) {
    const { currentCity, deleteCity } = useCities();
    const { cityName, date, emoji, id, position: { lat, lng } } = city;

    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        deleteCity(id)
    }

    return (
        <li >
            <Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${id === currentCity?.id ? styles[`cityItem--active`] : ' '}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} onClick={handleDelete}>
                    &times;
                </button>
            </Link>
        </li>
    )
}