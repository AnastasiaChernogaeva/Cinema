<template>
  <div class="row" :id="`rId${rId}`" @dragenter="checkrId(rId)">
      <small>{{rId}}</small>
      <div class="place" v-for="(place, idx) of places" :key="idx+1" :id="'place'+(idx+1)" @drop="divDrop(EO, idx+1)"
    @dragover="divDragOver">{{idx+1}}</div>

  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
    props:['places', 'rId',],
    setup(){
    // const r = reactive()
    // const checkrId = (rId)=>{
    //     r= document.getElementById(`rId${rId}`);
    //     console.log(r);
    // }

    const divDrop = (EO, id, )=>{

    EO=EO||window.event;
    EO.preventDefault();


    var HTMLData=EO.dataTransfer.getData("text/html");
    if ( HTMLData )
    {  
        // if(r.children[id-1].innerHTML !==id){
          
        //     document.getElementById(`place${id}`).innerHTML=`${id}${HTMLData}`;
        // }
        // else
         document.getElementById(`place${id}`).innerHTML+=HTMLData;
        
    }

    // var TextData=EO.dataTransfer.getData("text/plain");
    // if ( TextData )
    // {
    //     if ( !HTMLData )
    //         document.getElementById(`place${id}`).innerHTML+=TextData;
    // }

        }

        const divDragOver = (EO) =>{
            EO=EO||window.event;
            EO.preventDefault();
        }
        return{
            divDrop,
            divDragOver,
            checkrId
        }
    }

}
</script>

<style scoped>
    .row{
        padding: 1%;
        border-block: 1px solid blue;
        height:30px;
    }
    .place{
        text-align: center;
        color:transparent;
        display: inline-block;
        width:30px;
        height:30px;
        position: relative;
    }
    .place img.hallPlaces {
        position: absolute;
        left: 10%;
    }
    .place:hover{
        cursor:pointer;
        color: black;
    }
        .place:before{
        color:black;
        content:'.';
        position: absolute;
        left:50%;
    }
     .place:hover:before{
        content:".";
        color: transparent;
    }
</style>
