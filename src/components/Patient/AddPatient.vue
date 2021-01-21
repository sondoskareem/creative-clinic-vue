<template>
<div class="row">
    <Nav />

 <div class="add container">
 <div class="mb-30">
            <td><router-link
             class="btn btn-default mb-30" v-bind:to="'/patients'">Back</router-link></td>
    </div>
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add Patient</h1>
    <form v-on:submit="addpatient" enctype="multipart/form-data">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
            <div class="form-group">
                <label>name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="patient.name">
            </div>
                <label>Age</label>
                <input type="number" class="form-control" placeholder="Age" v-model="patient.age">
            </div>
            <div class="form-group">
                <label>phone</label>
                <input type="number" class="form-control" placeholder="Phone" v-model="patient.phone">
            </div>

            <div class="form-group">
                <label>password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="patient.password">
            </div>

            <div class="form-group">
                <label>condition</label>
                <input type="text" class="form-control" placeholder="department" v-model="patient.condition">
            </div>
            <div class="form-group">
                <label>file</label>
                <input type="file" accept="file/*" @change="onFileChanged" class="form-control" placeholder="File">
            </div>

           
        </div>  
      
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
 
</template>


<script>
    import Alert from '../Alert'
    import Nav from '../Nav'
    export default {
    name: 'addPatients',
    data () {
        return {
        alert:'',
        patient:{},
        user:this.$cookies.get('user').user,
        selectedFile:null
        }
    },
    methods: {
         onFileChanged (event) {
                 this.selectedFile = event.target.files[0]
            },
        addpatient(e){

             const formData = new FormData()
                formData.append('file', this.selectedFile)
                formData.append('name', this.patient.name)
                formData.append('condition', this.patient.condition)
                formData.append('age', this.patient.age)
                formData.append('phone', this.patient.phone)
                formData.append('password', this.patient.password)
                    
                let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://creative-clinic.herokuapp.com/api/patients',formData, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/patients', query: {alert: 'Patient Added'}});
                 })
            .catch(function (error) {
                 console.log('err   '+error.body.errors[0].details);
                 this.alert = error.body.errors[0].details;
               })
                e.preventDefault();
            
        }
    },
    components: {
        Alert,
        Nav
    }
    }
</script>
