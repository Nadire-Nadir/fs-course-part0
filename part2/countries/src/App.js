import { useEffect, useState } from "react";
import CountrySearch from "./components/countrySearch";
import CountriesList from "./components/countriesList";
import CountryDetail from "./components/countryDetail";

const App = () => {
    const [countryInput, setCountryInput] = useState("");
    const [countries, setCountries] = useState(null);
    const [message, setMessage] = useState(null);

    const API = "https://restcountries.com/v3.1/";

    const fetchCountries = () => {
        fetch(`${API}/name/${countryInput}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 404) {
                    setMessage("No country matches");
                    setCountries(null);
                } else if (response.length > 10) {
                    setMessage("Too many matches, specify anothe filter.");
                    setCountries(null);
                } else {
                    setCountries(response);
                    setMessage(null);
                }
            })
            .catch((error) => {
                console.log("fetch error", error);
            });
    };

    useEffect(() => {
        if (countryInput) {
            fetchCountries();
        }
    }, [countryInput]);

    const handleCountryChange = (event) => {
        setCountryInput(event.target.value);
    };

    return (
        <div>
            <CountrySearch
                countryInput={countryInput}
                onChange={handleCountryChange}
                message={message}
            />
            {countries && (
                <div>
                    {countries.length > 1 ? (
                        <CountriesList countries={countries} />
                    ) : (
                        <CountryDetail country={countries[0]} />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
