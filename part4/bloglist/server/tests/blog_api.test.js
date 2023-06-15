const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())

    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of a new blog', () => {
    test('created a new blog and saved to database with corrent content', async () => {
      const response = await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)

      expect(response.body.title).toContain('Canonical string reduction')

      const blogsInEnd = await api.get('/api/blogs')
      expect(blogsInEnd.length === helper.initialBlogs.length + 1)
    }, 100000)

    test('if the likes property is missing from the post request, default it to 0', async () => {
      const response = await api
        .post('/api/blogs')
        .send(helper.nonLikesBlog)
        .expect(201)

      expect(response.body.likes).toEqual(0)
    }, 100000)

    test('if title is missing from the post request, response with 400', async () => {
      await api.post('/api/blogs').send(helper.nonTitleBlog).expect(400)
    })

    test('if url is missing from the post request, response with 400', async () => {
      await api.post('/api/blogs').send(helper.nonUrlBlog).expect(400)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })
})

describe('editing a blog', () => {
    test('succeeds with status code 200 and updated likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToEdit = blogsAtStart[0]

        const updateBody = {
            likes: 999
        }

        await api
            .put(`/api/blogs/${blogToEdit.id}`)
            .send(updateBody)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const updatedBlog = blogsAtEnd.map(blog => blog.id === blogToEdit.id && blog)

        expect(updatedBlog[0].likes).toEqual(999)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})
