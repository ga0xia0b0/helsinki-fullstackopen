const bcrypt = require('bcrypt')
const { response } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const {username,name,password} = request.body

  const existingUser = await User.findOne( {username} )
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
     .find({}).populate('blogs',{user:0})
  response.json(users)
})

usersRouter.delete('/:id', async (request,response)=>{
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter