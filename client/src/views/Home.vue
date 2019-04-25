<template>
  <div>
    <AddAstronomy
    @fetchLagi="fetchMyApod"  
    />
    <form method="post" class="input-group mb-3">
      <input type="text" v-model="search" name="search" id="search" class="form-control" autocomplete="off" placeholder="Search..." />
      <div class="input-group-append">
      </div>
    </form>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <Detail v-for="(apod, index) in filteredApod" 
          :title="apod.title" 
          :date="apod.date" 
          :url="apod.url"
          :explanation="apod.explanation" 
          :id="apod._id"
          @fetchMyData="fetchMyApod" 
          :key="index" />
        </div>
        <div class="col-6">
          <router-view
          >
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import AddAstronomy from '../components/AddAstronomy'
  import Detail from '../components/Detail'

  export default {
    name: 'home',
    components: {
      AddAstronomy,
      Detail,
    },
    data() {
      return {
        container: [],      
        search: ''
      }
    },
    methods: {
      async fetchMyApod() {
        try {
          let { data } = await this.axios({
            url: 'apods',
            method: 'GET',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          this.container = data
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      },
    },
    created() {
      this.fetchMyApod()
    },
    computed: {
    filteredApod: function () {
      return this.container.filter(apod => {
        if(apod.title) {
          return apod.title.toLowerCase().match(this.search.toLowerCase())
        } 
      })
    }
  }
    
  }
</script>