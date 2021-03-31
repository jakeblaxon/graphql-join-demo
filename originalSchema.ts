import { makeExecutableSchema } from "@graphql-tools/schema";

const authors = [
  { id: "1", name: `William Shakespeare` },
  { id: "2", name: `Jane Austen` },
  { id: "3", name: `Charles Dickens` }
];

const books = [
  { id: "1", title: "Hamlet", authorId: "1" },
  { id: "2", title: "Great Expectations", authorId: "3" },
  { id: "3", title: "Pride and Prejudice", authorId: "2" },
  { id: "4", title: "Romeo & Juliet", authorId: "1" },
  { id: "5", title: "Macbeth", authorId: "1" },
  { id: "6", title: "A Tale of Two Cities", authorId: "3" }
];

export const originalSchema = makeExecutableSchema({
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
