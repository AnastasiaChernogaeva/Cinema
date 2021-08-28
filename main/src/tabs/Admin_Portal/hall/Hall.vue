<template>
<div class="container">
<!-- :id="id" -->
  <div class="card hall" >
      <h3>Зал №{{id}}</h3>
      <row v-for="(row, idx) of info.rows " :key="idx" :places="info.places" :simplePl="info.simplePl" :vipPl="info.vipPl" :couplePl="info.couplePl" :rId="idx+1"></row>
  </div>
</div>
</template>

<script>
import row from "./Row.vue"
export default {
    components:{
        row,
    },
    props:['info'],
    setup(props){
        // console.log(props)
        // console.log(props.info.value.val)

        

        const infRes=(props.info.val!=undefined)?props.info.val:props.info.value.val
        const idRes=props.info.id?props.info.id:props.info.value.id

        return{
            info:infRes,
            id: idRes
        }
    },
}
</script>

<style scoped>
    /* .hallPlaces{
    float: left;
    width: 27px;
    height: 27px;
    margin-right: 11px;
    }
    img.hallPlaces.couple {
    margin-right: 0px;
    }
    .hallPlaces:hover{
        cursor:pointer;
    } */
    /* .take{
    padding: 1%;
    border: 2px solid black;
    width: 137px;
    height: 54px;
    position: absolute;
    left: 8%;
    box-sizing: border-box;
    } */
    .hall{
        padding: 1%;
        clear:both;
        border:2px solid black;
        min-width:350px;
        min-height:300px;
        position: relative;
        /* left:32%; */
        box-sizing: border-box;
    }
    /* border: 2px solid black;
    width: fit-content;
    height: auto; */
</style>