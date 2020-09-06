<template>
  <div>
    <form @submit.prevent="loginUser">
      <div>
        <input type="email" v-model="user.email" name="email" id="email" placeholder="Email" />
      </div>

      <div>
        <input type="password" v-model="user.password" name="password" id="password" placeholder="Senha" />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('users', ['login']),
    loginUser() {
      this.login(this.user)
          .then(() => this.$router.push('/'))
    }
  },
}
</script>