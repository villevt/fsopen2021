const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const api = supertest(app)

beforeAll(async () => {
  await helper.initializeUsers()
})

beforeEach(async () => {
  await helper.initializeBlogs()
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

  test("response has populated blogs with valid users", async () => {
    const response = await api.get("/api/blogs")
    const body = response.body
    for (const blog of body) {
      const match = {...await helper.getUserById(blog.user.id)}
      delete match.blogs
      expect(match).toEqual(blog.user)
    }
  })
})

describe("POST blogs", () => {
  let token = ""
  beforeAll(async () => {
    const response = await api.post("/api/login")
      .send({
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
      })
    token = `Bearer ${response.body.token}`
  })

  describe("valid blog creation", () => {
    test("the amount of blogs grows by one", async () => {
      await api.post("/api/blogs")
        .set("Authorization", token)
        .send(helper.newBlog)
        .expect(201)
  
      const blogs = await helper.getBlogs()
      expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    })
  
    test("the newly added blog exists in DB", async () => {
      await api.post("/api/blogs")
        .set("Authorization", token)
        .send(helper.newBlog)
        .expect(201)
  
      const blogs = await helper.getBlogs()
      blogs.map(blog => {
        delete blog.id
        delete blog.user
        return blog
      })
    })

    test("the newly added blog has the correct user ID", async () => {
      const response = await api.post("/api/blogs")
        .set("Authorization", token)
        .send(helper.newBlog)

      expect(response.body.user.id).toBe(helper.initialUsers[0]._id)
    })
  })

  describe("invalid blog creation", () => {
    test("if field likes is given null, it will be set 0", async () => {
      const blog = helper.newBlog
      delete blog.likes
  
      const response = await api.post("/api/blogs")
        .set("Authorization", token)
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
        .set("Authorization", token)
        .send(blog)
        .expect(400)
    })

    test("posting with invalid or missing token returns 401", async () => {
      const blog = helper.newBlog
  
      await api.post("/api/blogs")
        .set("Authorization", `${token}0`)
        .send(blog)
        .expect(401)

      await api.post("/api/blogs")
        .set("Authorization", token.substring(7))
        .send(blog)
        .expect(401)

      await api.post("/api/blogs")
        .send(blog)
        .expect(401)
    })
  })
})

describe("DELETE blogs", () => {
  let token = ""
  beforeAll(async () => {
    const response = await api.post("/api/login")
      .send({
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
      })
    token = `Bearer ${response.body.token}`
  })

  test("deletion without ID or false ID returns 404", async () => {    
    await api.delete("/api/blogs/")
      .set("Authorization", token)
      .expect(404)
  })

  test("deletion with correct ID returns 204", async () => {
    const blogs = await helper.getBlogs()
    
    await api.delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", token)
      .expect(204)
  })

  test("the correct item is deleted", async () => {
    const blogsPreDelete = await helper.getBlogs()
    
    await api.delete(`/api/blogs/${blogsPreDelete[0].id}`)
      .set("Authorization", token)

    blogsPreDelete.splice(0, 1)

    const blogsPostDelete = await helper.getBlogs()

    expect(blogsPostDelete).toEqual(blogsPreDelete)
  })

  test("trying to delete with invalid token returns 401", async () => {
    const blogs = await helper.getBlogs()
    await api.delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", `${token}0`)

    await api.delete(`/api/blogs/${blogs[0].id}`)

    await api.delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", token.substring(7))
  })

  test("trying to delete another user's blog returns 401", async () => {
    const blogs = await helper.getBlogs()
    await api.delete(`/api/blogs/${blogs[1].id}`)
      .set("Authorization", `${token}`)
  })
})

describe("PUT blogs", () => {
  test("updating an item returns status 204", async () => {
    const blog = await helper.getBlog()
    const updatedBlog = {
      likes: blog.likes + 1,
    }
    await api.put(`/api/blogs/${blog.id}`)
      .send(updatedBlog)
      .expect(204)
  })

  test("updating a blog updates the item correctly in DB", async () => {
    const blog = await helper.getBlog()
    blog.likes += 1

    await api.put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(204)

    const updatedBlog = await helper.getBlogById(blog.id)
    expect(updatedBlog).toEqual(blog)
  })

  test("updating a blog without ID returns 400", async () => {
    const blog = await helper.getBlog()
    blog.likes += 1

    await api.put("/api/blogs/")
      .send(blog)
      .expect(404)
  })

  test("updating a blog without supplying likes returns 400", async () => {
    const blog = await helper.getBlog()
    delete blog.likes

    await api.put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(400)
  })
})

describe("POST comments for blogs", () => {
  test("POSTing a comment to blog with valid ID adds the comment to DB", async () => {
    const blog = await helper.getBlog()
    const comment = "Nice blog"

    await api.post(`/api/blogs/${blog.id}/comments`)
      .send({comment})
      .expect(204)
    
    const updated = await helper.getBlogById(blog.id)
    expect(updated.comments).toBeDefined()
    expect(updated.comments).toContain(comment)
  })
})


afterAll(() => {
  mongoose.connection.close()
})