const blogs = [
  {
    likes: 8,
    title: 'Stuff about stuff',
    author: 'Johnny',
    url: 'www.stuff.com',
    user: {
      name: 'Daniel Staffrd',
      id: '5d6933bed2b41c742240fa67'
    },
    id: '5d6d0c01dda6a862eaa2d3da'
  },
  {
    likes: 4,
    title: 'Admin Posting',
    author: 'Some guy',
    url: '1213.com',
    user: {
      name: 'Admin',
      id: '5d6c16bcdda6a862eaa2d3c5'
    },
    id: '5d6d115edda6a862eaa2d3e1'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
