<template>
<div id="MainBlock">
<div class="container">
    <the-nav-bar @timeToSearchFilmSession="search"></the-nav-bar>
       <!-- <div class="card portal">
        <small class="admin">Клиентская страница</small>
        </div> -->
     
</div> 
<div class="content"><router-view :search="text"></router-view></div>
   <app-footer></app-footer>
</div>
</template>

<script>
import { ref } from "vue";
import TheNavBar from "../Clients_Interface/ui/TheNavBar.vue"
import AppFooter from "./ui/AppFooter.vue"

export default {
      components:{
        TheNavBar,
        AppFooter,
    },
    setup(){
        const text = ref()
        const search = (value)=>{
            text.value = value
        }
        let height = window.innerHeight
        
        let elem =document.getElementById('MainBlock')
        // console.log(elem.style.height);
        return{
            search,
            text
        }
    }

}
</script>

<style scopoed>
/* .MainBlock{ 
    min-height: 100%;
    /* display:flexbox;
    flex-direction: column; */
    /* } */
    .content{
        /* height: calc(100%-15%); */
        margin-bottom: 5%;
    }
    /* and (min-width: 499px) */
 @media all  and (max-width: 699px){
.navbar h3{
    font-size: 1rem;
    justify-content: center;

}
/* li a{
    font-size: 15px;
} */
ul.navbar-menu{
    display: none;
}
div.navbar{
        justify-content: center;
}
div table.table td {
    padding: .25rem .01rem;
    font-size: 12px;
}
 }

</style>