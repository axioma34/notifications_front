<template>
    <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <div v-if="showError" class="alert alert-danger d-flex align-items-center alert-dismissible" role="alert">
        <i class="bi bi-exclamation-triangle-fill pe-2"></i>
        <div>
          Invalid login or password!
        </div>
        <button @click="showError = false" type="button" class="btn-close btn-sm" aria-label="Close"></button>
      </div>
      <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input v-model="login" type="text" class="form-control" id="floatingInput" placeholder="Username">
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>

        <div class="checkbox mb-3">
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <router-link to="/">
          <button type="button" class="mt-1 w-100 btn btn-dark btn-lg px-4 me-sm-3">
            <i class="bi bi-house"></i>
            Home
          </button>
        </router-link>
      </form>
    </main>
    </body>
</template>
<script>
import { useAuthStore } from '@/stores'

export default {
  name: 'LoginPage',
  data () {
    return {
      login: null,
      password: null,
      showError: false
    }
  },
  methods: {
    async submit () {
      const authStore = useAuthStore()
      try {
        await authStore.LogIn({
          username: this.login,
          password: this.password
        })
        await this.$router.push('/')
      } catch (error) {
        this.showError = true
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
body {
  height: 100vh;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
