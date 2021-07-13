const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const Comment =  require("../models/comment")
const User = require("../models/user")
const config = require("../utils/config")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "5a4225a51bb4a676234d17f7",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "5a4225a51bb4a676234d17f7",
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "5a422b891b54a676234d17fa",
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "5a422b3a1a52abc6a34d17f9",
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "5a4225a51bb4a676234d17f7",
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "5a422b3a1a52abc6a34d17f9",
    __v: 0
  }  
]

const newBlog = {
  title: "Testing Title",
  author: "Testing Author",
  url: "https://testing.com",
  likes: 10
}

const initializeBlogs = async () => {
  await Blog.deleteMany()
  await Blog.insertMany(initialBlogs)
  await Comment.deleteMany()
}

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getBlog = async () => {
  const blog = await Blog.findOne({})
  return blog.toJSON()
}

const getBlogById = async id => {
  const blog = await Blog.findById(id)
  return blog.toJSON()
}

const getPopulatedBlogById = async id => {
  const blog = await Blog.findById(id)
    .populate("comments")
    .populate("user", {username: true, name: true, id: true})
  return blog
}

const initialUsers = [
  {
    _id: "5a4225a51bb4a676234d17f7",
    username: "Reactor",
    name: "Rayleigh Or",
    password: "123",
    blogs: [
      "5a422a851b54a676234d17f7",
      "5a422aa71b54a676234d17f8",
      "5a422ba71b54a676234d17fb"
    ],
    __v: 0
  },
  {
    _id: "5a422aa72b14a646234617f8",
    username: "GOMaster",
    name: "Go To",
    password: "95gfaf8gj2k4rjfao",
    blogs: [],
    __v: 0
  },
  {
    _id: "5a422b3a1a52abc6a34d17f9",
    username: "N00BTube",
    name: "Kenny Kidd",
    password: "FortNite123",
    blogs: [
      "5a422b891b54a676234d17fa",
      "5a422bc61b54a676234d17fc"
    ],
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    username: "Eräukko",
    name: "Jorma Virtanen",
    password: "123sanasala",
    blogs: [
      "5a422b3a1b54a676234d17f9"
    ],
    __v: 0
  },
]

const newUser = {
  username: "SuperUser",
  name: "Usain User",
  password: "050gagajiog934jgr"
}

const initializeUsers = async () => {
  await User.deleteMany()

  const users = await Promise.all(initialUsers.map(async user => {
    const copy = {...user}
    copy.passwordHash = await bcrypt.hash(user.password, 10)
    delete copy.password
    return copy
  }))

  await User.insertMany(users)
}

const getUserById = async id => {
  const user = await User.findById(id)
  return user.toJSON()
}

const getUserFromToken = async token => {
  const decoded = jwt.verify(token, config.TOKEN_SECRET)
  const user = await getUserById(decoded.id)
  return user
}

const getComments = async () => {
  const comments = await Comment.find({})
  return comments
}

module.exports = {
  initialBlogs,
  newBlog,
  initializeBlogs,
  getBlogs,
  getBlog,
  getBlogById,
  getPopulatedBlogById,
  getUserFromToken,
  initialUsers,
  newUser,
  initializeUsers,
  getUserById,
  getComments
}