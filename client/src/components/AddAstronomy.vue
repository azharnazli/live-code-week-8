<template>
  <div class="jumbotron">
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div>
          <h2>Add Astronomy Picture</h2>
          <p>
            Please input date</em>, etc.
          </p>
          <form method="post" class="input-group">
            <vuejsdatepicker v-model="waktu" ></vuejsdatepicker>
            <div class="input-group-append">
              <button class="btn btn-primary" 
              @click.prevent="postData" 
              v-on:click.prevent="$emit('fetchLagi')"
              >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import vuejsdatepicker from 'vuejs-datepicker';

export default {
  components: {
    vuejsdatepicker
  },
  data()  {
    return{
      waktu: ''
    }
  },
  methods: {
     postData() {
       this.axios({
         url: 'apods',
         method:'POST',
         data: {
           date: this.waktu
         },
         headers: {
           token: localStorage.getItem('token')
         }
       })
       .then(({data})=> {
          this.$emit('fetchLagi')
       })
       .catch(err => {
         console.log(err)
       })

    }
  }
}
</script>