const CountrySearch = ({ countryInput, onChange, message }) => {
    return (
        <div>
            Find countries: <input value={countryInput} onChange={onChange} />
            <p>{message }</p>
        </div>
    );
}

export default CountrySearch;