import { useState, useEffect } from 'react';
import Geocode from 'react-geocode'

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
Geocode.setLocationType("ROOFTOP");

export const useAddress = (latLng: { lat: number, lng: number }) => {
    
    const [address, setAddress] = useState<string>('')

    const latString = latLng.lat.toString()
    const lngString = latLng.lng.toString()

    useEffect(() => {
        Geocode.fromLatLng(latString, lngString)
            .then(response => {
                setAddress(response.results[0].formatted_address)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [latLng])

    return address
}