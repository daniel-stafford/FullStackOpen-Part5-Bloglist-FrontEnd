import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "A person",
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).toHaveTextContent(blog.author)
  const expandedDiv = component.container.querySelector('.expandedBlog')
  expect(expandedDiv).toHaveTextContent(blog.likes)
})