const getTokenFrom = request => {
  const auth = request.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7)
  } else {
    return null
  }
}

module.exports = {
  getTokenFrom
}