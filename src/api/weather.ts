import { ICurrentWeather } from './../interfaces/ICurrentWeather.interface';
import axios from 'axios'

export interface IGetWeatherRequestData {
    lat: number
    lon: number
    appid: string
    units: string
    lang: string
}

export const getWeather = async (getRequestData: IGetWeatherRequestData) => {
    const { lat, lon, appid, units, lang } = getRequestData

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}&lang=${lang}`

    return axios.get<ICurrentWeather>(url)
}