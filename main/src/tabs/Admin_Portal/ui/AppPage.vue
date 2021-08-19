<template>
    <div class="container">
         <div class="card">
        <h1 class="card-title">
           {{subtitle}}
           <router-link to="/admin/adding" v-if="$route.path!='/admin/adding'">
               <button class="btn primary">Добавить</button>
           </router-link>
        </h1>
         </div>
            <div class="card">
             <slot/>
            </div>
     </div>
 </template>

<script> 

 export default {
     props:{
         subtitle:{
             type:String,
             required:true,
         }
     },

     setup(props){
         document.title = `${props.subtitle} | Админский портал`
     }
 }
</script>
