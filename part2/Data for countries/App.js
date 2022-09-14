import axios from 'axios'
import {useState,useEffect} from 'react'
import Filter from './components/Filter'

const App = () => {
  const [filter,setFilter] = useState('')
  const [countries,setCountries] = useState([])
  const filtered = countries.filter(
    elem=>
    elem.name.common.toUpperCase().indexOf(filter.toUpperCase())!==-1
  )
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response=>{setCountries(response.data)})
    },[])
  
  return(
  <div>
    <form>
        find countries <input 
        value={filter} onChange={event=>setFilter(event.target.value)}>
        </input>
    </form>
    <Filter filtered={filtered} setFilter={setFilter}/>
  </div>
  )
}

export default App