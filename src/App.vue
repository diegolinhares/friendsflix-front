<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <a href="" v-if="isAuthenticated" @click.prevent="logoutUser">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('users', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('users', ['logout']),
    logoutUser() {
      this.logout()
          .then(() => this.$router.push('/'))
    }
  }
}
</script>