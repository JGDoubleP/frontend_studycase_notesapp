import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloclient = new ApolloClient({
  uri: 'https://notes-server-8xhf.onrender.com',  // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default apolloclient;
