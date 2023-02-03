<template>
  <div>
    <nav class="navbar bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand">
          Hello <b>{{ auth.isAuthenticated ? auth.StateUser.userName : '' }} </b>,
          This is test task by Andrey Rennit
        </a>
        <form class="d-flex">
            <button @click.prevent="authClick" class="btn btn-primary" type="submit">
              {{ auth.isAuthenticated ? 'Logout' : 'Login' }}
            </button>
        </form>
      </div>
    </nav>
    <main>
      <slot/>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores'
import router from '../router'

export default {
  name: 'defaultLayout',
  data () {
    return {
      auth: useAuthStore()
    }
  },
  methods: {
    authClick () {
      if (this.auth.isAuthenticated) {
        this.auth.LogOut()
      }
      router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  color: white !important;
}
</style>
