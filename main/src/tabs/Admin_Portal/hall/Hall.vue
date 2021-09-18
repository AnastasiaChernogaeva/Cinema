<template>
<div class="container">
  <div class="card " >
      <h3>Зал №{{id}}</h3>
       <row v-for="(row, idx) of info.rows " :key="idx" :places="info.places" :simplePl="info.simplePl" :vipPl="info.vipPl" :couplePl="info.couplePl" :rId="idx+1" @choosePlace="choosePlace" :book="book" @buyPlaces="buyPlaces"
      :occupiedPlaces="occupiedPlaces && Array.from(occupiedPlaces).flat(2).filter(info=>info.row===idx+1)"></row> 
      <!-- .filter(occupiedRow=>occupiedRow.filter(occupyPlaces=>occupyPlaces.row===idx+1) -->
  </div>
</div>
</template>

<script>
import {ref, watch} from 'vue'
import row from "./Row.vue"
export default {
    components:{
        row,
    },
    props:['info', 'book', 'occupiedPlaces'],
    emit:['choosePlace'],
    setup(props, {emit}){
        watch(()=>props.occupiedPlaces, (newValue, oldValue)=>{
            // console.log('nn', props.occupiedPlaces);
        })
        const infoRowsandPlaces = ref(new Set())
        const arrBoughtTickets = ref([])
        

        const infRes=(props.info.val!=undefined)?props.info.val:props.info.value.val
        const idRes=props.info.id?props.info.id:props.info.value.id
        const choosePlace =(event)=>{
            infoRowsandPlaces.value.add(event)
            emit('choosePlace',infoRowsandPlaces.value)
        }

        const buyPlaces=(event)=>{
            arrBoughtTickets.value.push(...event)

        }


        return{
            info:infRes,
            id: idRes,
            choosePlace,
            buyPlaces,
            arrBoughtTickets
        }
    },
}
</script>

<style scoped>
    .hall{
        padding: 1%;
        clear:both;
        min-width:350px;
        min-height:300px;
        position: relative;
        box-sizing: border-box;
    }
</style>