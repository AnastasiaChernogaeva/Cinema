<template>

   <div class="with-nav">
        <the-nav-bar></the-nav-bar> 
        <router-view></router-view> 
  </div>
  
  
</template>

<script> 

import TheNavBar from "../TheNavBar.vue";
export default {
        components:{
                TheNavBar, 

        },
//          setup(){
//       const route = useRoute()
//       const SUBTITLES_MAP = {
//           films:'Фильмы',
//           cinemas:'Кинотеатры',
//           sessions:'Сеансы',
//           add_services:'Дополнительные услуги',
//           adding:'Добавить',

//       }
      
//       const subtitleWeNeed = computed(()=> {
//           let englishName = route.path.split('/')[route.path.split('/').length-1]
//            return (englishName!=='admin'|| '')?SUBTITLES_MAP[englishName]:'Фильмы'
//           }) 



//         //   console.log(subtitleWeNeed)

// //    console.log(route.path.split('/')[route.path.split('/').length-1]);

//       return{
//         //   giveSubtitle:computed(()=> route.path.split('/')[route.path.split('/').length-1]) ,
//         subtitleWeNeed,
//       }

//   },
}
</script>