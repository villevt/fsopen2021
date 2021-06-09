require("express-async-errors")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const tokens = require("../utils/token-extractor")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: true, name: true, id: true})
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const token = request.token
  const decoded = jwt.verify(token, config.TOKEN_SECRET)
  if (!token || !decoded.id) {
    return response.status(401).json({error: "token missing or invalid"})
  }

  const user = await User.findById(decoded.id)
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
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(result)
})

module.exports = blogsRouter