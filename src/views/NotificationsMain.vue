<template>
  <default-layout>
    <div class="container">
      <transition
          name="bounce">
        <div
            v-if="notification"
            class="alert alert-warning pb-1"
        >
          <h4 class="alert-heading">
            <i class="bi bi-info-lg"></i>
            {{ notification.header }}
            <button @click="getNext" type="button" class="btn-close btn-sm float-end" aria-label="Close"></button>
          </h4>
          <p> {{ notification.text }}</p>
        </div>
      </transition>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '../layouts/defaultLayout'

export default {
  name: 'NotificationsMain',
  components: { DefaultLayout },
  data () {
    return {
      notifications: [],
      notification: null,
      index: -1,
      timeout: null,
      updateInterval: null
    }
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    clearTimeout(this.timeout)
    clearInterval(this.updateInterval)
  },
  methods: {
    async init () {
      try {
        const response = await this.axios.get('/notification/')
        this.notifications = response.data
      } catch (e) {
        console.log(e)
      }
      this.getNext()
      this.getInterval()
    },
    getNext () {
      this.notification = null
      this.index++
      clearTimeout(this.timeout)
      if (this.index >= this.notifications.length) {
        this.notification = null
        this.timeout = null
        this.index--
        return
      }
      setTimeout(() => {
        this.notification = this.notifications[this.index]
        this.axios.post(`/notification/${this.notification.id}/view`)
      }, 500)
      this.timeout = setTimeout(() => {
        this.getNext()
      }, 4500)
    },
    getInterval () {
      this.updateInterval = setInterval(async () => {
        try {
          const response = await this.axios.get(`/notification/?start=${this.notifications.length}`)
          if (response.data && response.data.length) {
            this.notifications.push(...response.data)
            if (!this.timeout) { this.getNext() }
          }
        } catch (e) {
          console.log(e)
        }
      }, 10000)
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .2s;
}

.bounce-leave-active {
  animation: bounce-in .2s reverse;
}

@keyframes bounce-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.alert {
  position: fixed;
  bottom: 5px;
  left:25%;
  width: 50%;
}
</style>
