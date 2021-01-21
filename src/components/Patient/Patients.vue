<template>
   <div class="row">
    <Nav />
 <div class="customers container">

    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Manage Patient</h1>
    <br />
    <div class="mb-30">
            <td><router-link class="btn btn-success mb-30" v-bind:to="'/addPatient'">Add New Patient</router-link></td>
    </div>
    <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>condition</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient , index) in patients" :key=index>
            <td>{{patient.user.id}} </td>
            <td>{{patient.user.name}}</td>
            <td>{{patient.user.phone}}</td>
            <td>{{patient.condition}}</td>
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
    name: 'patients',
    data () {
        return {
        patients: [],
        alert:''
        }
    },
    methods: {
         GetPatient(){
           
          this.$http.get('https://creative-clinic.herokuapp.com/api/patients' ,
          {
             headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "accept": "application/x-www-form-urlencoded; charset=UTF-8",
             'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
            },
          })
            .then(function (response){
              console.log(response.body.items)
                this.patients = (response.body.items)
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
      console.log(this.$cookies.get('user').user.type)
            this.GetPatient()
        
    },
    components: {
        Alert,
        Nav
    }
    }
</script>
