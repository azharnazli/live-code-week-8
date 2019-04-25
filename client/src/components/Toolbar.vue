<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/">
        <a class="navbar-brand">From NASA with love</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
           <router-link to="/">
              <a class="nav-link">Home</a>
            </router-link>
        </ul>
      </div>

      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li v-if="!isLogin" class="nav-item">
             <router-link to="/login">
              <a class="nav-link">Login</a>
            </router-link>
          </li>
          <li  v-if="isLogin" class="nav-item">
             <router-link to="/">
              <a class="nav-link"
              @click.prevent="logout">Logout</a>
            </router-link>
          </li>
          <li v-if="!isLogin" class="nav-item">
             <router-link to="/register">
              <a class="nav-link">Register</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    methods: {
      checkLocal() {
        if(localStorage.getItem('token')) {
          this.$store.commit('login')
        }
      },
      logout() {
        localStorage.clear()
        this.$store.commit('logout')
      }
    },
    created() {
      this.checkLocal()
    },
    computed : {
        ...mapState(['isLogin'])
    } 
  }
</script>