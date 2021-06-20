require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const mongoose = require("mongoose")

const Author = require("./models/Author")
const Book = require("./models/Book")

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"]
  },  
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"]
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"]
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let result = args.author ? books.filter(book => book.author === args.author) : books
      return args.genre ? result.filter(book => book.genres.some(genre => genre === args.genre)) : result
    },
    authorCount: () => authors.length,
    allAuthors: () => authors
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author(args)
      await author.save()
      return author
    },
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({name: args.author})
        await author.save()
      }
      const book = new Book(args)
      await book.save()
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author
    }
  },

  Author: {
    bookCount: root => books.filter(book => book.author === root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const initializeAuthors = async () => {
  if ((await Author.find({})).length === 0) {
    for (const author of authors) {
      const newAuthor = new Author({...author, id: undefined})
      await newAuthor.save()
    }
  }
}

const initializeBooks = async () => {
  if ((await Book.find({})).length === 0) {
    for (const book of books) {
      const author = await Author.findOne({name: book.author})
      const newBook = new Book({...book, author: author, id: undefined})
      await newBook.save()
    }
  }
}

mongoose.connect(process.env.MONGODB_URI, {useFindAndModify: true, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
const init = async () => {
  await initializeAuthors()
  await initializeBooks()
}

init()

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})