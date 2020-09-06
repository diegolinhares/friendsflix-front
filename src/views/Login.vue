<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <input type="email" v-model="email" name="email" id="email" placeholder="Email" />
      </div>

      <div>
        <input type="password" v-model="password" name="password" id="password" placeholder="Senha" />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { LOGIN_MUTATION } from '@/graphql/users/'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      let login = await this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: this.email,
          password: this.password,
        },
      })

      console.log(login.data)
    },
  },
}
</script>