const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = {
    likes: request.body.likes
  }

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {context: "query", new: true, runValidators: true})
    response.status(204).json(result)
  } catch (exception) { 
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter