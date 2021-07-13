#### Bloglist Backend

Backend of a bloglist application, made with Express and MongoDB.

Supports the following endpoints and functionality:
* /api/users
  - GET list of all users and their blogs
  - POST a new user
* /api/login
  - POST a request to login as an existing user
* /api/blogs
  - GET all blogs
  - POST a new blog
  - PUT /id update a blog
  - DELETE a blog

The application has the following features:
* Token-based authentication
* Proper password management (hashed with bcrypt)
* Unit tests with JEST to ensure proper functionality
* Basic error handling
* Retrieving and saving users and blogs to MongoDB with mongoose
* Joining users and blogs data in mongoose