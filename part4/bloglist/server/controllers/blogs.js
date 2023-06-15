const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blogBody = !request.body.likes ?
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: 0
    }
    :
    request.body

  if (!request.body.title || !request.body.url) {
    response.status(400).end()
  } else {
    const newBlog = new Blog(blogBody);
    const savedBlog = await newBlog.save();
    response.status(201).json(savedBlog);
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter