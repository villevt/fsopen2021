const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length == 0) {
    return 0 
  } else {
    return(blogs
      .map(blog => blog.likes)
      .reduce((sum, likes) => sum + likes))
  }
}

module.exports = {
  dummy,
  totalLikes
}