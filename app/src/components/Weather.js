import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import countries from 'i18n-iso-countries'
import T from '../context/language/LanguageConsumer'
import { Card } from 'primereact/card'
import './css/Weather.css'
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

function Weather(props) {
  // State
  const [apiData, setApiData] = useState({})

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}`

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data))
  }, [apiUrl])

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2)
  }
  const renovableAnimation = 'assets/images/wind.svg'
  return (
    <Card>
      {apiData.main ? (
        <div class="card-body ">
          <img
            src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
            alt="Estado"
            className="weather-icon"
          />
          <div className="p-formgroup-inline">
            <p className="city">
              <i className="pi pi-map-marker" style={{ fontSize: '1em' }}></i>{' '}
              <strong>{apiData.name}</strong>
            </p>
            <p className="state">
              <strong>
                {' '}
                {countries.getName(apiData.sys.country, 'en', {
                  select: 'official',
                })}
              </strong>
            </p>
            <p className="temp">
              {kelvinToFarenheit(apiData.main.temp)}&deg; C
            </p>
          </div>

          <div className="p-formgroup-inline form2lineWeather">
            <div className="inf2lineWeather">
              <p>
                <i className="fa fa-thermometer-empty"></i>{' '}
                <strong>
                  {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                </strong>
              </p>
            </div>
            <div className="inf2lineWeather">
              <p>
                <i className="fa fa-thermometer-full"></i>{' '}
                <strong>
                  {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                </strong>
              </p>
            </div>
            <div className="inf2lineWeather">
              <p>
                <i className="fa fa-tint"></i>{' '}
                <strong>{apiData.main.humidity}</strong>
              </p>
            </div>
            <div className="inf2lineWeather">
            <div className="p-formgroup-inline" >
              <object
                data={renovableAnimation}
                type="image/svg+xml"
                className="topbar-logo"
              ></object>

              <p style={{marginLeft: '-30px'}}>              
                <strong>{apiData.wind.speed}</strong>
              </p>
              </div>
              </div>
            </div>
        </div>
       
      ) : (
        <h1>
          <T clave="loadSearch" />
        </h1>
      )}
    </Card>
  )
}

export default Weather
