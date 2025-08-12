import { Link } from "react-router-dom";
import type { CityType } from "../types";
import styles from "./CityItem.module.css";


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
    const { cityName, date, emoji, id, position: { lat, lng } } = city;
    return (
        <li >
            <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}