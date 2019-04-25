<template>
    <div class="card" id="detail" v-if="!loading" >
      <div class="card-header">
        Detail
      </div>
      <div class="card-body">
        <h2 class="card-title"><u>{{apod.title}}</u></h2>
        <div class="card-text">
          <h4>{{apod.explanation}}</h4>
          <br /><br /><br />
          <h4>{{apod.date.slice(0,10)}}</h4>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      apod: {},
      loading: true
    }
  },
  methods:{
    async fetchMyData() {
      try {
        let { data } = await this.axios({
          method:'get',
          url: 'apods/'+ this.$route.params.id,
          headers:{
            token: localStorage.getItem('token')
          }
        })
         this.apod = data
      } catch (error) {
        console.log(error)
      }

    }
  },
  created() {
    this.fetchMyData()
    .then(()=> {
      this.loading = false
    })
  },
  watch: {
    $route() {
      this.fetchMyData()
    }
  }
}
</script>