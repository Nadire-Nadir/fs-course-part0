import { useState } from "react";
import CountryDetail from "./countryDetail";

const CountriesList = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    return (
        <div>
            {countries.map((country) => (
                <div key={country.name.common}>
                    {country.name.common}
                    <button
                        onClick={() => setSelectedCountry(country)}
                    >
                        Show
                    </button>
                </div>
            ))}
            {selectedCountry &&
                <CountryDetail country={selectedCountry} />
            }
        </div>
    );
};

export default CountriesList;
