import React from 'react'

const CountryList = ({countries}) => (
    <table>
        <tbody>
            {countries.sort((a, b) => a.name < b.name ? -1 : 1).map(country => (
                    <tr key={country.name}>
                        <td>{country.name}</td>
                    </tr>          
                )
            )}
        </tbody>
    </table>
)

export default CountryList