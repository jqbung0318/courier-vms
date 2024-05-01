import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"


export const createApolloClient = () => new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:3001/graphql',
        fetchOptions: {
            mode: 'no-cors'
        }
    })
})