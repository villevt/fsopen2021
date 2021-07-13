import React, {useState, useEffect} from 'react'
import axios from 'axios'

const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState()

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${country.capital}`).then(response => {
            setWeather(response.data)
        })
    }, [country])

    let display = ""
    if (weather) {
        if (!weather.current) {
            display ="Error fetching weather data"
        }
        else {
            display = (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <b>Temperature:</b> {weather.current.temperature} Celsius
                    <br/>
                    <img alt={weather.current.weather_descriptions} src={weather.current.weather_icons} width="100" height="100" />
                    <br/>
                    <b>Wind:</b> {weather.current.wind_speed} direction {weather.current.wind_dir}
                </div>
            )
        }
    }

    console.log(display)

    return (
        <div>
            {display}
        </div>
    )
}

export default Weather