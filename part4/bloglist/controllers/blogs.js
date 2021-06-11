require("express-async-errors")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: true, name: true, id: true})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({error: "missing or invalid token"})
  }

  const body = request.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })

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
  const user = request.user
  if (!user) {
    return response.status(401).json({error: "missing or invalid token"})
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id) {
    return response.status(401).json({error: "user unauthorized to delete blog"})
  } else {
    const result = await Blog.findByIdAndRemove(blog.id)
    response.status(204).json(result)
  }
})

module.exports = blogsRouter