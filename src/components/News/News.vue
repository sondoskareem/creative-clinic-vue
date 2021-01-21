<template>
   <div class="row">
    <Nav />
 <div class="customers container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">News</h1>
    <br />
    <div class="mb-30">
            <td><router-link class="btn btn-success mb-30" v-bind:to="'/addNews'">Add News</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(news , index) in news" :key=index>
            <td>{{news.id}} </td>
            <td>{{news.title}}</td>
            <td>{{news.description}}</td>
            <td><img src="https://media.vanguardcommunications.net/blog-e1505840253663.jpg" alt="" border=3 height=40 width=40/></td>             
            <td >
              <router-link class="btn btn-default" v-bind:to="'/news'">
              Details
              </router-link>
              </td>
          </tr>
        </tbody>
    </table>
  </div>
  </div>
 
</template>


<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
    export default {
    name: 'news',
    data () {
        return {
        news: [],
        alert:''
        }
    },
    methods: {
         GetPatient(){
           
          this.$http.get('https://creative-clinic.herokuapp.com/api/news' ,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "accept": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              console.log(response.body.items)
                this.news = (response.body.items)
                 })
            .catch(function (error) {
                 console.log(error.body.errors[0].details);
                 this.alert = error.body.errors[0].details

                 if(error.body.errors[0].title == "Unauthenticated"){
                    this.$router.push({path: '/', query: {alert: 'Unauthenticated Login again'}});
                    }

               })
        }
        
    },
     created:function() {
        if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
            this.GetPatient()
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>
