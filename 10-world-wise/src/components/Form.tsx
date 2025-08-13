// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { BackButton, Button, Message, Spinner } from "./";
import { useCities, useUrlPosition } from "../hooks";
import { convertToEmoji } from "../util";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import type { CityType } from "../types";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export function Form() {

    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [geoError, setGeoError] = useState('');
    const navigate = useNavigate();

    const [lat, lng] = useUrlPosition();
    const { createCity, isLoading } = useCities();

    useEffect(() => {

        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true)
                setGeoError('')
                const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await response.json();

                if (!data.countryCode) {
                    throw new Error(`That doesn't seem to be a city. Click somewhere else`)
                }

                setCityName(data.city || data.locality || '')
                setCountry(data.countryName)
                setEmoji(convertToEmoji(data.countryCode))
            } catch (error) {
                console.error(`Error ::: ${error}`)
                setGeoError(`Error ::: ${(error as Error).message}`)
            } finally {
                setIsLoadingGeocoding(false)
            }
        }

        fetchCityData()
    }, [lat, lng])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity: CityType = {
            cityName,
            country,
            emoji,
            date: date.toDateString(),
            notes,
            position: { lat, lng },
            id: ''
        };

        await createCity(newCity)
        navigate('/app/cities')
    }

    if (isLoadingGeocoding) return <Spinner />

    if (!lat && !lng) return <Message message={'Start by clicking somewhere on the map'} />

    if (geoError) return <Message message={geoError} />

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name </label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName + emoji}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id='date' onChange={(date) => setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary' buttonType="submit">
                    Add
                </Button>
                <BackButton />
            </div>
        </form>
    );
}

