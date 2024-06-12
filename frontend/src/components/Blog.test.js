import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('By default, Blog component renders just the title and author of the blog', () => {
  const user = { username: 'example', name: 'xmpl', token: 'tokenUser1' }
  const blogDetails = {
    title: 'abc',
    author: '123',
    id: 'idblog1',
    likes: 567,
    url: 'xyz',
    user: { username: 'example', name: 'xmpl', id: 'idUser1' }
  }
  const setBlogs = jest.fn()
  const setOutcomeMessage = jest.fn()

  render(
    <Blog user={user} blog={blogDetails} setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage}/>
  )

  console.log()

  screen.getByText('abc', { exact: false })
  screen.getByText('123', { exact: false })
  expect(screen.queryByText('567', { exact: false })).toBeNull()
  expect(screen.queryByText('xyz', { exact: false })).toBeNull()

})