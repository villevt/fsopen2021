require("express-async-errors")
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const Comment = require("../models/comment")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {username: true, name: true, id: true})
    .populate("comments")
  response.json(blogs)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  if (!request.body.comment) {
    return response.status(401).json({error: "comment missing in request body"})
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(401).json({error: "invalid blog ID"})
  }

  const comment = new Comment({content: request.body.comment, blog: blog})

  await comment.save()

  if (!blog.comments) {
    blog.comments = []
  }

  blog.comments.push(comment)

  const result = await blog.save()

  response.status(204).json(result)
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