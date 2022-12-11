import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const PORT = 4001;

const createApp = async (): Promise<void> => {
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    introspection: true,
    cache: 'bounded',
  });

  server.listen({ port: PORT });
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
};

createApp();

/*
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
*/
