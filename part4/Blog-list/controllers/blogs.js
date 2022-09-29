const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{blogs:0})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user
  
  if (!user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response)=>{
  const user = request.user
  if (!user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if(user.id!==blog.user.toString()){
    return response.status(401).json({ error: 'wrong user' })
  }
  await Blog.deleteOne(blog)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response)=>{
  const blog = await Blog.findByIdAndUpdate(request.params.id,request.body,{new:true,runValidators:true})
  response.status(201).send(blog)
})

module.exports = blogsRouter