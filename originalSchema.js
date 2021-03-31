const { makeExecutableSchema } = require("@graphql-tools/schema");

exports.originalSchema = makeExecutableSchema({
  typeDefs: `
    type Query {
      getAuthors(ids: [String]): [Author]
      getBooks(ids: [String]): [Book]
      getBooksByAuthorIds(ids: [String!]!): [Book]
    }
    type Author {
      id: String!
      name: String
    }
    type Book {
      id: String!
      title: String
      authorId: String
    }
  `,
  resolvers: {
    Query: {
      getAuthors(parent, args) {
        return authors;
      },
      getBooks(parent, args) {
        return books;
      },
      getBooksByAuthorIds(parent, args) {
        return books.filter((book) => args.ids.includes(book.authorId));
      }
    }
  }
});
const authors = [
  { id: "1", name: `A` },
  { id: "2", name: `B` },
  { id: "3", name: `C` }
];
const books = [
  { id: "1", title: "title A", authorId: "3" },
  { id: "1", title: "title A", authorId: "1" },
  { id: "1", title: "title A", authorId: "3" },
  { id: "1", title: "title A", authorId: "2" },
  { id: "1", title: "title A", authorId: "3" }
];
