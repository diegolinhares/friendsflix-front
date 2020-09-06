import { apolloClient } from '@/apollo'
import { LOGIN_MUTATION } from '@/resources/users/graphql/'

export default {
  async login({ commit }, userData) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: { ...userData },
      })

      commit('LOGIN_USER', data.userLogin.credentials)
    }
    catch(e) {
      console.log(e)
    }
  }
}