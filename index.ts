import GraphQLJoinTransform from "jakeblaxon-graphql-join";
import { originalSchema } from "./originalSchema";
import { wrapSchema } from "@graphql-tools/wrap";
import { ApolloServer } from "apollo-server";

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
