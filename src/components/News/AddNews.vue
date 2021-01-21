<template>
<div class="row">
    <Nav />

 <div class="add container">
 <div class="mb-30">
            <td><router-link
             class="btn btn-default mb-30" v-bind:to="'/news'">Back</router-link></td>
    </div>
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add News</h1>
    <form v-on:submit="addpatient" enctype="multipart/form-data">
        <div class="well">
            <h4>Info</h4>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" placeholder="Title" v-model="news.title">
            </div>

            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" placeholder="Description" v-model="news.description">
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
    name: 'addNews',
    data () {
        return {
        news: {},
        alert:'',
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
                formData.append('title', this.news.title)
                formData.append('description', this.news.description)

                let  headers= {
                    'Authorization' : 'Bearer '+this.$cookies.get('user').access_token ,
                    }
               
        this.$http.post('https://creative-clinic.herokuapp.com/api/news',formData, {headers})
            .then(function (response){
                console.log('Success  '+response)
               this.$router.push({path: '/news', query: {alert: 'News Added'}});
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
