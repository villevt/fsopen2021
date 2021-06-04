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
    return blogs.sort((a, b) => b.likes - a.likes)[0]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}