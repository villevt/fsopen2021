const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [{
  _id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
}, {
  _id: "5a322aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful Considered Harmful",
  author: "Frank Rubin",
  url: "https://web.archive.org/web/20090320002214/http://www.ecn.purdue.edu/ParaMount/papers/rubin87goto.pdf",
  likes: 6,
  __v: 0
}, {
  _id: "5a322aa71b54a476234d1768",
  title: "Who even cares?",
  author: "Me",
  url: "https://localhost:3000",
  likes: 2,
  __v: 0
}]

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(13)
  })
})

describe("favorite blogs", () => {
  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test("when list has only one blog equals it", () => {
    const result = listHelper.favoriteBlog([blogs[1]])
    expect(result).toEqual({
      _id: "5a322aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful Considered Harmful",
      author: "Frank Rubin",
      url: "https://web.archive.org/web/20090320002214/http://www.ecn.purdue.edu/ParaMount/papers/rubin87goto.pdf",
      likes: 6,
      __v: 0
    })
  })

  test("of a bigger list returns the right blog", () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      _id: "5a322aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful Considered Harmful",
      author: "Frank Rubin",
      url: "https://web.archive.org/web/20090320002214/http://www.ecn.purdue.edu/ParaMount/papers/rubin87goto.pdf",
      likes: 6,
      __v: 0
    })
  })
})