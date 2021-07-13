const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const api = supertest(app)

beforeAll(async () => {
  await helper.initializeUsers()
})

describe("login tests", () => {
  test("logging in returns status 200, and token, username and name in json", async () => {
    const user = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    }

    const response = await api.post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-type", /application\/json/)

    const body = response.body
    expect(body.token).toBeDefined()
    expect(body.username).toBeDefined()
    expect(body.name).toBeDefined()
  })

  test("the token points to correct user", async () => {
    const user = {
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password
    }

    const response = await api.post("/api/login")
      .send(user)

    const body = response.body
    const receivedUser = await helper.getUserFromToken(body.token)
    expect(receivedUser.username).toEqual(user.username)
  })

  test("trying to login with invalid username or password returns 401", async () => {
    const userUsername = {
      username: `${helper.initialUsers[0].username}0`,
      password: helper.initialUsers[0].password
    }

    await api.post("/api/login")
      .send(userUsername)
      .expect(401)

    const userPassword = {
      username: helper.initialUsers[0].username,
      password: `${helper.initialUsers[0].password}0`
    }

    await api.post("/api/login")
      .send(userPassword)
      .expect(401)
  })

  test("login without username or password returns 401", async () => {
    await api.post("/api/login")
      .send({
        username: helper.initialUsers[0].username
      })
      .expect(401)

    await api.post("/api/login")
      .send({
        password: helper.initialUsers[0].password
      })
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})