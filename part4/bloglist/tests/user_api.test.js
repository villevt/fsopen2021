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
      .expect(500)
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
})

afterAll(() => {
  mongoose.connection.close()
})