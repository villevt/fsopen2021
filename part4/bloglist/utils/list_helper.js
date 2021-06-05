const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0 
  } else {
    return(blogs
      .map(blog => blog.likes)
      .reduce((sum, likes) => sum + likes))
  }
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  } else if (blogs.length === 1) {
    return blogs[0]
  } else {
    return [...blogs].sort((a, b) => b.likes - a.likes)[0]
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  } else if (blogs.length === 1) {
    return {author: blogs[0].author, blogs: 1}
  } else {
    const authors = {}
    let most = {author: "", blogs: -1}
    blogs.forEach(blog => {
      const authoredBlogs = authors[blog.author] || 0
      if (authoredBlogs) {
        authors[blog.author]++
      } else {
        authors[blog.author] = 1
      }
      if (authoredBlogs > most.blogs) {
        most.author = blog.author
        most.blogs = authoredBlogs + 1
      }
    })
    return most
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}