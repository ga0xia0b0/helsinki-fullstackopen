import { useState,useEffect } from "react"
import axios from "axios"

const Detail = ({country}) => {
    const [temp,setTemp] = useState()
    const [speed,setSpeed] = useState()
    const [iconURL,setIconURL] = useState(``)
    const lang = []
    for(let i in country.languages){
      lang.push(country.languages[i])
    }
    const apikey = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`

    useEffect(()=>{
      axios
      .get(URL)
      .then(response=>{
        setTemp(response.data.main.temp)
        setSpeed(response.data.wind.speed)
        setIconURL(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
    })
    
    return (
      <div>
        <h2>{country.name.common}</h2>
        capital {country.capital[0]} <br></br>
        area {country.area}
        <h5>languages: </h5>
        <ul>
          {lang.map(elem=>
          <li key={elem}>
            {elem}
          </li>)}
        </ul>
        <img src={country.flags.png} alt='国旗' width='180' height='180'/>
        <h3>Weather in {country.capital}</h3>
        <p>temperature {(temp-273.15).toFixed(2)} Celcius</p>
        <img src={iconURL} alt='天气图标'></img>
        <p>wind {speed} m/s</p>
      </div>
    )
}

export default Detail