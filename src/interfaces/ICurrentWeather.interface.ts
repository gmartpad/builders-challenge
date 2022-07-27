
type ICoordIndex = 'lon' | 'lat'

export type ICoord =  {
    [key in ICoordIndex]: number
}

export interface IWeather {
    id: number
    main: string
    description: string
    icon: string
}

type IMainIndex = 'temp' | 'feels_like' | 'temp_min' | 'temp_max' | 'pressure' | 'humidity'

export type IMain = {
    [key in IMainIndex]: number
}

type IWindIndex = 'speed' | 'deg'

export type IWind = {
    [key in IWindIndex]: number
}

export interface IClouds {
    all: number
}

export type ISys = {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
}

export interface ICurrentWeather {
    coord: ICoord
    weather: IWeather[]
    base: string
    main: IMain
    visibility: number
    wind: IWind
    clouds: IClouds
    dt: number
    sys: ISys
    timezone: number
    id: number
    name: string
    cod: number             
}