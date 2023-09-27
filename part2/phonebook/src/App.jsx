import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  const addPerson = (event) => { 
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  })

  const handleDeletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)

    if(personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name} ?`)) {
        personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={event => setNewFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App