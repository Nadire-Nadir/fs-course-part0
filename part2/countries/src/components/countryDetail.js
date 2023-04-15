const CountryDetail = ({ country }) => {
    const flagUrl = country.flags.png

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
        <img src={flagUrl} width="200" />
      </div>
    );
};

export default CountryDetail;
