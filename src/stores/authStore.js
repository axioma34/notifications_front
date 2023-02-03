import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    isAdmin: (state) => state.user ? state.user.roles.includes('ROLE_ADMIN') : false
  },

  actions: {
    async LogIn (user) {
      await axios.post('/login', user).then((response) => {
        if (!response.data) { throw Error('No response data') }
        this.setUser(response.data)
      })
    },

    async LogOut () {
      this.user = null
      localStorage.removeItem('user')
    },

    setUser (user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
})
