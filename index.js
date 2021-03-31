const { default: GraphQLJoinTransform } = require("jakeblaxon-graphql-join");
const { originalSchema } = require("./originalSchema.js");
const { wrapSchema } = require("@graphql-tools/wrap");
const { ApolloServer } = require("apollo-server");

const graphqlJoinTransform = new GraphQLJoinTransform({
  typeDefs: `
    extend type Author {
      books: [Book!]!
    }
    extend type Book {
      author: Author
    }
  `,
  resolvers: {
    Author: {
      books: `getBooksByAuthorIds(ids: $id) { id: authorId }`
    },
    Book: {
      author: `getAuthors(ids: $authorId) { authorId: id }`
    }
  }
});

const gatewaySchema = wrapSchema({
  schema: originalSchema,
  transforms: [graphqlJoinTransform]
});

const port = 4000;
new ApolloServer({ schema: gatewaySchema }).listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
