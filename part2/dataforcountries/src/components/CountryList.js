import React from 'react'

const CountryList = ({countries, handleClick}) => (
    <table>
        <tbody>
            {countries.sort((a, b) => a.name < b.name ? -1 : 1).map(country => (
                    <tr key={country.name}>
                        <td>{country.name}</td>
                        <td>
                            <button onClick={handleClick} value={country.name}>
                                show
                            </button>
                        </td>
                    </tr>          
                )
            )}
        </tbody>
    </table>
)

export default CountryList