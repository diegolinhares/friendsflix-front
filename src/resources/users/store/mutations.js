export default {
  LOGIN_USER (state, { accessToken, tokenType, client, uid }) {
    state.user = { email: uid }

    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('token-type', tokenType)
    localStorage.setItem('client', client)
    localStorage.setItem('uid', uid)
  },
  LOGOUT_USER (state) {
    state.user = {}
    localStorage.clear()
  }
}