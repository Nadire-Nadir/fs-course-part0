const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { info } = require('../utils/logger')
const { userExtractor, tokenExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog(
     {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()
  info(`blog linked to user ${user.username}`)

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    if (blogToDelete.user._id.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }
)

blogsRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const body = request.body

    const blogToUpdate = await Blog.findById(request.params.id)

    if (blogToUpdate.user._id.toString() === request.user._id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        body,
        { new: true }
      )
      info(`blog ${blogToUpdate.title} successfully updated`)
      response.status(200).json(updatedBlog.toJSON())
    } else {
      return response.status(401).json({ error: 'Unauthorized' })
    }
  }
)

module.exports = blogsRouter