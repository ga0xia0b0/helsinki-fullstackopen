require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/Person')
const { query } = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  const result = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ]
  result.push(tokens.method(req, res)==='POST'?JSON.stringify(req.body):null)
  return result.join(' ')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name,number } = request.body

  Person
    .findByIdAndUpdate(request.params.id,{ name,number },{ new:true,runValidators:true,context:query })
    .then(newperson => {response.json(newperson)})
    .catch(error => next(error))
})

app.get('/info',(request,response) => {
  Person.find({}).then(persons => {
    response.send(
      `Phonebook has info for ${persons.length} people <br>
      ${new Date()}`
    )
  })
})

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  Person.find({}).then(() => {
    const newPerson = new Person({
      name: person.name,
      number: person.number
    })
    newPerson.save()
      .then(sevedPerson => {
        response.json(sevedPerson)
      })
      .catch(error => next(error))
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})