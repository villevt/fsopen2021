import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
  test("renders title and author, but not url or likes by default", () => {
    const user = {
      username: "Herpderp"
    }

    const blog = {
      title: "Nice Blog",
      author: "Mrx. Nice Gul",
      url: "myspace.com",
      likes: 300,
      user: user
    }

    const currentUsername="It doesn't matter"
    const handleLike = jest.fn()
    const handleRemove = jest.fn()
  
    const component = render(
      <Blog blog={blog} currentUsername={currentUsername} handleLike={handleLike} handleRemove={handleRemove}/>
    )
  
    expect(component.container).toHaveTextContent(
      "Nice Blog"
    )

    expect(component.container).toHaveTextContent(
      "Mrx. Nice Gul"
    )

    expect(component.container).not.toHaveTextContent(
      "myspace.com"
    )

    expect(component.container).not.toHaveTextContent(
      "300"
    )
  })
})