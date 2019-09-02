import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [expandBlog, setExpandBlog] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div
        onClick={() => {
          console.log('blog clicked!')
          setExpandBlog(!expandBlog)
        }}
      >
        {blog.title} {blog.author}
      </div>
      {expandBlog && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes{' '}
            <button onClick={() => handleLike({ blog })}>Like</button>
          </p>
          <p>Added by {blog.user.name}</p>
          <button onClick={() => handleRemove({ blog })}>Remove</button>
        </div>
      )}
      <div></div>
    </div>
  )
}

export default Blog
