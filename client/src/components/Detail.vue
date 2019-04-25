<template>
  <!-- <div class="col-6"> -->
  <div class="card mt-2">
    <div class="card-body">
      <h5 class="card-title">{{title}}</h5>

      <div v-if="url.slice(-3) == 'jpg'">
        <img class="card-img-top" v-bind:src="url" alt="Card image cap">
        <!-- FOR VIDEO -->

        <!-- FOR IMAGE -->
      </div>
      <div v-else>
        <iframe width="498" height="332" :src="url"></iframe>
      </div>

      <div class="mt-3">
        <router-link :to="'/description/'+id">
        <a  class="btn text-light btn-primary mr-2">See detail</a>
        </router-link>
       
        <a @click.prevent="deleteApod(id)" class="btn btn-danger">Delete</a>
      </div>
    </div>
  </div>


</template>
<script>
  export default {
    props: ['title', 'url','date','explanation','id'],
    methods: {
      async deleteApod(id) {
        console.log(id)
        try {
          let {data} = await this.axios({
            method: 'delete',
            url: 'apods/'+ id,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.$emit('fetchMyData')
        } catch (error) {
          console.log(error)
        }
      }
    }

  }
</script>