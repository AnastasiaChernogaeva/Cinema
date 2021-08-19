<template>
    <div class="container">
         <div class="card">
        <h1 class="card-title">
          <span>{{subtitle}}</span> 
               <button class="btn primary" @click="modal = true">Добавить</button>
        </h1>
         </div>
         <slot/>
        

        <app-modal v-if="modal" @close="modal = false" >
               <slot name="insidecontent"/>
           
        </app-modal>

     </div>
 </template>

<script> 
import {ref} from "vue";
import AppModal from "../ui/AppModal.vue"



 export default {
     props:{
         subtitle:{
             type:String,
             required:true,
         },
     },
     components:{
         AppModal,
     },
     setup(props){
         document.title = `${props.subtitle} | Админский портал`
            const modal = ref(false)

        return{
            modal,
        }

     }
 }
</script>
