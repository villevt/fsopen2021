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

afterAll(() => {
  mongoose.connection.close()
})