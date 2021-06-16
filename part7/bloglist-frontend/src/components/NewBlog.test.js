import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import NewBlog from "./NewBlog"

describe("<NewBlog />", () => {
  const createBlog = jest.fn()

  const newTitle = "New Title"
  const newAuthor = "New Author"
  const newUrl = "New URL"

  test("submit event handler gets the correct parameters", () => {
    const component = render(
      <NewBlog createBlog={createBlog}/>
    )

    const title = component.container.querySelector("[name=\"Title\"]")
    fireEvent.change(title, {
      target: {value: newTitle}
    })

    const author = component.container.querySelector("[name=\"Author\"]")
    fireEvent.change(author, {
      target: {value: newAuthor}
    })

    const url = component.container.querySelector("[name=\"Url\"]")
    fireEvent.change(url, {
      target: {value: newUrl}
    })

    const form = component.container.querySelector("form")
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe(newTitle)
    expect(createBlog.mock.calls[0][0].author).toBe(newAuthor)
    expect(createBlog.mock.calls[0][0].url).toBe(newUrl)
  })
})