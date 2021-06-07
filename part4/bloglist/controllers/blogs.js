require("express-async-errors")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: true, name: true, id: true})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    likes: request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {context: "query", new: true, runValidators: true})
  response.status(204).json(result)
})

blogsRouter.delete("/:id", async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(result)
})

module.exports = blogsRouter