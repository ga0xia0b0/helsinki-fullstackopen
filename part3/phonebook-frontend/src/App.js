import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/personServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(null)
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState('')
  const [className,setClassName] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    const newperson = {name:newName, number:newNumber}
    if(persons.every(person=>person.name!==newName)){
      personServices
        .create(newperson)
        .then(res=>{
          personServices.getAll().then(response=>{setPersons(response)})
        })
        .then(res=>{
          setMessage(`Added ${newName}`);setClassName('succeed')
          setTimeout(()=>{setMessage('')},3000)
        })
        .catch(error=>{
          setMessage(JSON.stringify(error.response.data));setClassName('fail')
          setTimeout(()=>{setMessage('')},3000)
        })
    }
    else{
      const result = window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)
      if(result){
        const id = persons.filter(person=>person.name===newName)[0].id
        personServices
          .update(id,newperson)
          .catch(error=>{
            setMessage(`Information of ${newName} has already been removed from server`)
            setClassName('fail')
          })
        setPersons(persons.map(person=>{
            if(person.id===id)return {...person,number:newNumber}
            else return person
          }))
        setMessage(`Updated ${newName}`);setClassName('succeed')
        setTimeout(()=>{setMessage('')},3000)
      }
    }
    setNewName(''); setNewNumber('')
  }

  const delPerson = (name) =>{
    const result = window.confirm(`Delete ${name} ?`)
    if(result){
      personServices.del(persons.filter(person=>person.name===name)[0].id)
      setPersons(persons.filter(person=>person.name!==name))
      setMessage(`Deleted ${name}`);setClassName('succeed')
      setTimeout(()=>{setMessage('')},3000)
    }
  }

  useEffect(()=>{
    personServices.getAll()
    .then(response=>{
      setPersons(response)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm props={{newName,setNewName,newNumber,setNewNumber,addPerson}}/>
      <h3>Numbers</h3>
      <Persons props={{persons,filter,delPerson}}/>
    </div>
  )
}

export default App