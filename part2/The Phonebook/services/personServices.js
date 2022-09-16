import axios from "axios";
const URL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(URL).then(response=>response.data)
}
  
const create = newperson => {
    return axios.post(URL, newperson).then(response=>response.data)
}
  
const update = (id, newperson) => {
    return axios.put(`${URL}/${id}`, newperson).then(response=>response.data)
}

const del = (id) => {
    return axios.delete(`${URL}/${id}`).then(response=>response.data)
}

const personServices = {getAll,create,update,del}

export default personServices