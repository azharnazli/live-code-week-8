<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card mb-4">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <form method="">
              <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
              </div>
              <button @click.prevent="login">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try {
          let { data } = await this.axios({
            method: 'POST',
            url: 'login',
            data: {
              email: this.email,
              password: this.password
            }
          })
          localStorage.setItem('token', data)
          this.$store.commit('login')
          this.$router.replace('/')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>