import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"

export const { getClient } = registerApolloClient(() =>
    new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: 'http://backend:3001/graphql',
        })
    })
)