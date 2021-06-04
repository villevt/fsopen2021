const listHelper = require("../utils/list_helper")

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = []
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [{
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }]
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })

  test("when list has only one blog equals the likes of that", () => {
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
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(13)
  })
})