const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

describe("GET blogs", () => {
  test("blogs are returned as JSON", async () => {
    await api.get("/api/blogs")
      .expect(200)
      .expect("Content-type", /application\/json/)
  })
  
  test("correct amount of blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    const contents = response.body
    expect(contents.length).toBe(helper.initialBlogs.length)
  })
  
  test("response identifier field is named id", async () => {
    const response = await api.get("/api/blogs")
    const contents = response.body
    contents.forEach(content => {
      expect(content.id).toBeDefined()
    })
  })
})

describe("POST blogs", () => {
  test("the amount of blogs grows by one", async () => {
    await api.post("/api/blogs")
      .send(helper.newBlog)
      .expect(201)

    const blogs = await helper.getBlogs()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  test("the newly added note exists in DB", async () => {
    await api.post("/api/blogs")
      .send(helper.newBlog)
      .expect(201)

    const blogs = await helper.getBlogs()
    blogs.map(blog => {
      delete blog.id
      return blog
    })
    expect(blogs).toContainEqual(helper.newBlog)
  })

  test("if field likes is given null, it will be set 0", async () => {
    const blog = helper.newBlog
    delete blog.likes

    const response = await api.post("/api/blogs")
      .send(blog)
      .expect(201)

    const content = response.body
    expect(content.likes).toBe(0)
  })

  test("if title and url are not given, return 400", async () => {
    const blog = helper.newBlog
    delete blog.title
    delete blog.url

    await api.post("/api/blogs")
      .send(blog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})