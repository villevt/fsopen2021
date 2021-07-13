import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import CountryDisplay from "./components/CountryDisplay"
import CountryList from "./components/CountryList"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([{
    name: "",
    capital: "",
    population: 0,
    languages: [{}],
    flag: ""
  }]) 
  const [displayedCountry, setDisplayedCountry] = useState({})
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag").then(response=> {
      setCountries(response.data)
    })
  }, [])

  const filterCountries = useCallback(() => {
    return countries.filter(country => country.name.toLowerCase().startsWith(filter))
  }, [countries, filter])

  useEffect(() => {
    const filteredCountries = filterCountries()
    if (filteredCountries.length === 1) {
      setDisplayedCountry(filteredCountries[0])
    } else {
      setDisplayedCountry({})
    }
  }, [filterCountries])

  const filterHandler = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setFilter(newFilter)
  }

  const showCountryDisplay = (event) => {
    setDisplayedCountry(countries.find(country => country.name === event.target.value))
  }

  const filteredCountries = filterCountries()

  const tooManyMatches = filteredCountries.length > 10 
    ? "Too many matches, specify another filter." 
    : ""

  const countryList = filteredCountries.length > 1 && filteredCountries.length <= 10 
    ? <CountryList countries={filteredCountries} handleClick={showCountryDisplay}/> 
    : ""

  const countryDisplay = displayedCountry.name
    ? <CountryDisplay country={displayedCountry} /> 
    : ""

  return (
    <div>
      <Filter handleFilter={filterHandler}/>
      {tooManyMatches}
      {countryList}
      {countryDisplay}
    </div>
  )
}

export default App