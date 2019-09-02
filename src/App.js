import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setNotification({ type: 'success', message: 'Correct credentials!' })
      setTimeout(() => {
        setNotification({ type: null, message: null })
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotification({ type: 'error', message: 'Wrong credentials' })
      setTimeout(() => {
        setNotification({ type: null, message: null })
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleLogOut = () => {
    console.log('you clicked log out')
    setUser(null)
    window.localStorage.clear()
    setNotification({ type: 'success', message: 'Logged out!' })
    setTimeout(() => {
      setNotification({ type: null, message: null })
    }, 5000)
  }

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const handleAddBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        title,
        author,
        url
      }
      await blogService.create(blogObject)
      setBlogs(blogs.concat(blogObject))
      setNotification({ type: 'success', message: `blog added!` })
      setTimeout(() => {
        setNotification({ type: null, message: null })
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      setNotification({
        type: 'error',
        message: `Error adding blog ${exception}`
      })
      setTimeout(() => {
        setNotification({ type: null, message: null })
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogOut}>Log out</button>
          </p>
          <div style={hideWhenVisible}>
            <button onClick={() => setAddBlogVisible(true)}>New Post</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm
              handleAddBlog={handleAddBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
            <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
          </div>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}
export default App
