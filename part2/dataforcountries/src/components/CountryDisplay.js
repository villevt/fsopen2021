import React from 'react'

import Weather from "./Weather"

const CountryDisplay = ({country}) => (
    <div>
        <h1>{country.name}</h1>
        Capital {country.capital}
        <br />
        Population {country.population}
        <h2>Languages</h2>
        <ul>
            {country.languages.map(lang => (
                <li key={lang.name}>
                    {lang.name}
                </li>
                )
            )}
        </ul>
        <img alt="flag" src={country.flag} width="200" height="200"/>
        <Weather country={country} />
    </div>
)

export default CountryDisplay