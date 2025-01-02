const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

// Define the GraphQL schema
const typeDefs = gql`
  type Photo {
    albumId: Int
    id: Int
    title: String
    url: String
    thumbnailUrl: String
  }

  type Query {
    photos: [Photo]
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    photos: async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw new Error("Failed to fetch photos");
      }
    },
  },
};

// Create an instance of Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
