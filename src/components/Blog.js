import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
            {blog.likes} likes <button>Like</button>
          </p>
          <p>Added by {blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
