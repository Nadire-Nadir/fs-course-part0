import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/notification";

const App = () => {
    const [persons, setPersons] = useState(null);

    const [newName, setNewName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [filterInput, setFilterInput] = useState("");
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchPersons = () => {
        personService
            .getAllPersons()
            .then((response) => {
                setPersons(response);
            })
            .catch((error) => {
                console.log("fetch error", error);
            });
    };

    useEffect(fetchPersons, []);

    if (!persons) {
        return null;
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const checkName = (name) => {
        if (
            persons.some((person) => person.name.toLowerCase() === name.toLowerCase())
        ) {
            return true;
        }
    };

    const addPerson = (event) => {
        event.preventDefault();

        if (checkName(newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with the new one?`
                )
            ) {
                const index = persons.findIndex.call(
                    persons,
                        (person) => person.name.toLowerCase() === newName.toLowerCase()
                );
                const targetedId = persons[index].id;

                const nameObject = {
                    name: persons[index].name,
                    number: phoneNumber,
                };
              
                personService
                    .updatePerson(targetedId, nameObject)
                    .then((response) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== targetedId ? person : response
                            )
                        );
                        setMessage(`Updated ${response.name}'s number`);

                        setTimeout(() => {
                          setMessage(null);
                        }, 5000);
                    }).catch(error => {
                        console.log("update error", error);
                        if (error.response.status === 404) {
                            setErrorMessage(`Information of ${newName} has already been removed from server.`);
                            setTimeout(() => {
                               setErrorMessage(null);
                            }, 5000);
                        }
                    })
            }
        } else {
            const nameObject = {
                id: persons.length + 1,
                name: newName,
                number: phoneNumber,
            };

            personService
                .createPerson(nameObject)
                .then((response) => {
                    setPersons(persons.concat(response));
                    setMessage(`Added ${response.name}`);

                    setTimeout(() => {
                       setMessage(null);
                    }, 5000);
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
        setNewName("");
        setPhoneNumber("");
    };

    const handleFilterChange = (event) => {
        setFilterInput(event.target.value);
    };

    const regex = new RegExp(filterInput.toLowerCase());
    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().match(regex)
    );

    const deletePerson = (id) => {
        if (window.confirm("Do you really want to delete this person?")) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((persons) => persons.id !== id));
                })
                .catch((error) => {
                    console.log("delete error", error);
                });
        }
    };

    return (
        <div>
            <h2>Phone Book</h2>

            <Notification message={message} errorMessage={ errorMessage } />

            <Filter value={filterInput} onChange={handleFilterChange} />

            <h3>Add new</h3>

            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                phoneNumber={phoneNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>

            <div>
                {filterInput ? (
                    <Persons
                        persons={filteredPersons}
                        onClick={(id) => deletePerson(id)}
                    />
                ) : (
                    <Persons
                        persons={persons}
                        onClick={(id) => deletePerson(id)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
