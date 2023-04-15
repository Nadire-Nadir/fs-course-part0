const Persons = ({ persons, onClick }) => {

    return (
        <div>
            {persons.map((person) => (
                <div key={person.id}>
                    {person.name}: {person.number}
                    
                    <button onClick={() => onClick(person.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Persons;