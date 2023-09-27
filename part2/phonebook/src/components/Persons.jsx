import Person from "./Person"

const Persons = ({ filteredPersons }) => { 
  return(
    <ul>
      {filteredPersons.map(person => <Person key={person.id} person={person}> </Person>)}
    </ul>
  )
}

export default Persons