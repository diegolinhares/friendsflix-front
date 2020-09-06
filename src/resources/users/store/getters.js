export default {
  isAuthenticated() { return localStorage.getItem('access-token') !== null }
}