import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { DatabricksService } from './services/databricks';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

async function startServer() {
  const databricksService = new DatabricksService();
  await databricksService.connect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({
        dataSources: {
          databricks: databricksService,
        },
      }),
    })
  );

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});