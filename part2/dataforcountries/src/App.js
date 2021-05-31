import React, {useEffect, useState} from 'react'
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
  const [filter, setFilter] = useState(new RegExp(''))

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag").then(response=> {
      setCountries(response.data)
    })
  }, [])

  const filterHandler = (event) => {
    const newFilter = new RegExp(`^${event.target.value.toLowerCase()}`)
    setFilter(newFilter)
  }

  const filteredCountries = countries.filter(country => filter.test(country.name.toLowerCase()))
  let countryNode = "Too many matches, specify another filter."
  if (filteredCountries.length === 1 && filteredCountries[0].name !== "") {
    countryNode = <CountryDisplay country={filteredCountries[0]} />
  } else if (filteredCountries.length <= 10) {
    countryNode = <CountryList countries={filteredCountries} />
  }


  return (
    <div>
      <Filter handleFilter={filterHandler}/>
      {countryNode}
    </div>
  )
}

export default App