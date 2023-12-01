import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notificacion'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './index.css'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('Waiting for something to happen...')

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

    const existingPerson = persons.find(person => person.name === personObject.name)

    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personUpdated = {...existingPerson, number: newNumber}
  
        personService
          .updateNumber(existingPerson.id, personUpdated)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNotificationMessage(
              `The number of '${existingPerson.name}' has been changed from '${existingPerson.number} to '${personUpdated.number}'`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
      <Notification message={notificationMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={event => setNewFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App