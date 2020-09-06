import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from  'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_FRIENSDFLIX_GRAPHQL_ENDPOINT
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext(async (_, { headers }) => {
  const accessToken = localStorage.getItem('access-token')
  const tokenType = localStorage.getItem('token-type')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')

  return {
    headers: {
      ...headers,
      'access-token': accessToken || '',
      'token-type': tokenType || '',
      'client': client || '',
      'uid': uid || ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-and-network'
    }
  },
  errorHandler(error) {
    // eslint-disable-next-line no-console
    console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
  }
})