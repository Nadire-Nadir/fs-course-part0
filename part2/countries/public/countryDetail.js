const CountryDetail = ({ country }) => {

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} </p>

            <h3>Languages:</h3>
            <ul>
                {Object.keys(country.languages).map((i) => (
                    <li key={i}>{country.languages[i]}</li>
                ))}
            </ul>
            <div className="flag">{country.flag}</div>
        </div>
    );
};

export default CountryDetail;
