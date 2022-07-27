import { useState } from "react"
import { IMain } from "../../interfaces/ICurrentWeather.interface"

interface WeatherDetailsProps {
    weatherMain: Omit<IMain, 'pressure'>
}

interface Item {
    key: string
    value: number 
}

function WeatherDetails({weatherMain}: WeatherDetailsProps ) {

    const { temp, feels_like, temp_min, temp_max, humidity } = weatherMain

    const [itemList] = useState<Item[]>([
        {
            key: 'Temperatura',
            value: temp
        },
        {
            key: 'Sensação Térmica',
            value: feels_like
        },
        {
            key: 'Temperatura Mínima',
            value: temp_min
        },
        {
            key: 'Temperatura Máxima',
            value: temp_max
        },
        {
            key: 'Umidade',
            value: humidity
        }
    ])

    return (
        <div>
            {itemList.map((i, k) => (
                <p key={k}>
                    <b>{i.key}:</b> {i.value}{i.key !== 'Umidade' ? '°C': '%'}
                </p>
            ))}
        </div>
    )
}

export default WeatherDetails