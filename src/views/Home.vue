<template>
  <div class="main">
  <div class="px-4 pt-5 my-5 text-center border-bottom bg-white">
    <h1 class="display-4 fw-bold">Hello!</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">This is a test task made by Andrei Rennit.
        If you want just watch notifications press "Notifications" button.
        If you are admin, press "Login" button and go to notification admin pannel. Have fun!</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <router-link to="/notification-list">
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Notifications</button>
        </router-link>
        <router-link to="/login">
          <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Login</button>
        </router-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
</script>
<style scoped>
.main {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
}
</style>
