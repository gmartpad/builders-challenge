import { useCallback, useEffect, useState } from 'react'
import buildersLogo from './assets/builders.png'
import './App.css'
import { useAddress } from './utils/geocode'
import { IMain } from './interfaces/ICurrentWeather.interface'
import { getWeather, IGetWeatherRequestData } from './api/weather'
import WeatherDetails from './components/WeatherDetails'

function App() {

  const [isWeatherLoaded, setIsWeatherLoaded] = useState<boolean>(false)
  const [weatherMain, setWeatherMain] = useState<Omit<IMain, 'pressure'>>({
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0
  })
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0
  })

  const currentAddress = useAddress(latLng)
  
  const getCurrentWeather = async (requestData: IGetWeatherRequestData) => {
    const { lat, lon, appid, units, lang } = requestData

    if (lat !== 0 && lat !== 0) {
      const resp = await getWeather({
        lat,
        lon,
        appid,
        units,
        lang
      })
      setWeatherMain(resp.data.main)
      setIsWeatherLoaded(true)
    }
  }

  const successCallback = useCallback((pos: GeolocationPosition) => {
    const crd = pos.coords

    setLatLng({
      lat: crd.latitude,
      lng: crd.longitude
    })
  }, [])

  const errorCallback = useCallback((err: GeolocationPositionError) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }, [])

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const getLatLng = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
  }

  useEffect(() => {
    getLatLng()
  }, [])

  useEffect(() => {
    getCurrentWeather({
      lat: latLng.lat,
      lon: latLng.lng,
      appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
      units: 'metric',
      lang: 'pt_br'
    })
  }, [latLng])

  return (
    <div className="App">
      <div>
        <img src={buildersLogo} className="logo" alt="Builders logo" />
      </div>
      <h1>Builders Challenge</h1>
      <div className="card">
        <button onClick={() => getLatLng()}>Atualizar os dados</button>
        <p>
          <b>Endereço Atual:</b> {currentAddress}
        </p>
        {isWeatherLoaded && (
          <WeatherDetails weatherMain={weatherMain} />
        )}
      </div>
    </div>
  )
}

export default App