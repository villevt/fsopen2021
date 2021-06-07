const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const newBlog = {
  title: "Testing Title",
  author: "Testing Author",
  url: "https://testing.com",
  likes: 10
}

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getBlog = async () => {
  const blog = await Blog.findOne({})
  return blog.toJSON()
}

const getBlogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog.toJSON()
}

const initialUsers = [
  {
    _id: "5a4225a51bb4a676234d17f7",
    username: "Reactor",
    name: "Rayleigh Or",
    password: "123",
    __v: 0
  },
  {
    _id: "5a422aa72b14a646234617f8",
    username: "GOMaster",
    name: "Go To",
    password: "95gfaf8gj2k4rjfao",
    __v: 0
  },
  {
    _id: "5a422b3a1a52abc6a34d17f9",
    username: "N00BTube",
    name: "Kenny Kidd",
    password: "FortNite123",
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    username: "Eräukko",
    name: "Jorma Virtanen",
    password: "123sanasala",
    __v: 0
  },
]

const newUser = {
  username: "SuperUser",
  name: "Usain User",
  password: "050gagajiog934jgr"
}

const getUserById = async (id) => {
  const user = await User.findById(id)
  return user.toJSON()
}

module.exports = {
  initialBlogs,
  newBlog,
  getBlogs,
  getBlog,
  getBlogById,
  initialUsers,
  newUser,
  getUserById
}