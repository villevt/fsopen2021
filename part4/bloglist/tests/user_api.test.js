const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcryptjs")
const app = require("../app")
const helper = require("./test_helper")
const User = require("../models/user")

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()

  const users = await Promise.all(helper.initialUsers.map(async user => {
    return {
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, 10)
    }
  }))

  await User.insertMany(users)
})

describe("POST new user", () => {
  describe("valid user creation", () => {
    test("creating a new user returns 200", async () => {
      const user = helper.newUser
      await api.post("/api/users")
        .send(user)
        .expect(200)
    })
  
    test("creating a new user adds the user to DB", async () => {
      const user = helper.newUser
      const response = await api.post("/api/users")
        .send(user)
  
      const newUser = await helper.getUserById(response.body.id)
      expect(newUser.username).toBe(user.username)
      expect(newUser.name).toBe(user.name)
    })
  })

  describe("error handling of invalid user creation", () => {
    test("missing name, username or password returns 400 an error response", async () => {
      const user = helper.newUser
  
      await api.post("/api/users")
        .send({
          name: user.name,
          password: user.password
        })
        .expect(400)
  
      await api.post("/api/users")
        .send({
          username: user.username,
          password: user.password
        })
        .expect(400)
  
      await api.post("/api/users")
        .send({
          username: user.username,
          name: user.name
        })
        .expect(400)
    })
  
    test("duplicate username returns an error", async () => {
      const user = {
        username: helper.newUser.username,
        name: helper.newUser.name,
        passwordHash: await bcrypt.hash(helper.newUser.password, 10)
      }
  
      const userInDb = new User(user)
      await userInDb.save()
  
      await api.post("/api/users")
        .send({
          username: user.username,
          name: user.name,
          password: helper.newUser.password
        })
        .expect(400)
    })

    test("username or password shorter than 2 returns 400", async () => {  
      await api.post("/api/users")
        .send({
          username: helper.newUser.username.substring(0, 2),
          name: helper.newUser.name,
          password: helper.newUser.password
        })
        .expect(400)

      await api.post("/api/users")
        .send({
          username: helper.newUser.username,
          name: helper.newUser.name,
          password: helper.newUser.password.substring(0, 2)
        })
        .expect(400)
    })
  })
})

describe("GET users", () => {
  test("users are returned as JSON", async () => {
    await api.get("/api/users")
      .expect(200)
      .expect("Content-type", /application\/json/)
  })

  test("correct amount of users are returned", async () => {
    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test("response has fields username, name and id", async () => {
    const response = await api.get("/api/users")
    const body = response.body
    body.forEach(item => {
      expect(item.username).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.id).toBeDefined()
    })
  })

  test("response doesn't include password or its hash", async () => {
    const response = await api.get("/api/users")
    const body = response.body
    body.forEach(item => {
      expect(item.password).toBeUndefined()
      expect(item.passwordHash).toBeUndefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})