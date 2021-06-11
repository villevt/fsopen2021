import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
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

  test("renders title and author, but not url or likes by default", () => {
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

  test("all info is rendered when view is pressed", () => {
    const component = render(
      <Blog blog={blog} currentUsername={currentUsername} handleLike={handleLike} handleRemove={handleRemove}/>
    )
  
    const view = component.getByText("view")
    fireEvent.click(view)

    expect(component.container).toHaveTextContent(
      "Nice Blog"
    )

    expect(component.container).toHaveTextContent(
      "Mrx. Nice Gul"
    )

    expect(component.container).toHaveTextContent(
      "myspace.com"
    )

    expect(component.container).toHaveTextContent(
      "300"
    )
  })

  test("when like is pressed twice, the event handler is called twice", () => {
    const likeHandler = jest.fn()

    const component = render(
      <Blog blog={blog} currentUsername={currentUsername} handleLike={likeHandler} handleRemove={handleRemove}/>
    )

    fireEvent.click(component.getByText("view"))
  
    const like = component.getByText("Like")
    fireEvent.click(like)
    fireEvent.click(like)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})