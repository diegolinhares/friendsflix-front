import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      credentials {
        accessToken tokenType client uid
      }
    }
  }`
