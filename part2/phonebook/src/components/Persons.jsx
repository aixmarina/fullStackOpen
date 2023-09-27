import Person from "./Person"

const Persons = ({ filteredPersons, handleDeletePerson }) => { 
  return(
    <ul>
      {filteredPersons.map(person => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}> </Person>)}
    </ul>
  )
}

export default Persons