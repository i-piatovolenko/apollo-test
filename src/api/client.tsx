import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://3.142.219.180:4000/',
  cache: new InMemoryCache(),
  connectToDevTools: true
});