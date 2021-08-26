<template>
    <div class="row" >
        <div class="small">{{rId}}</div>

        <div class="place" v-for="(place,idx) in places" :key="idx">
            <span class="indx">
                <span>{{idx+1}}</span>

          <img src="./icons/2x/simple.png" alt="simple hall places " class="hallPlaces simple" v-if="simplePl &&simplePl.includes(rId)" >
          <img src="./icons/2x/vip.png" alt="vip hall places" class="hallPlaces vip" v-if="vipPl&&vipPl.includes(rId)" >
          <img src="./icons/2x/couple.png" alt="couple hall places" class="hallPlaces couple"  v-if="couplePl&&couplePl.includes(rId)" >
</span>
        </div>


   </div>
</template>

<script>
export default {
    props:[
        'rId',
         'simplePl',
            'vipPl',
            'couplePl',
            'places',
    ],
}
</script>

<style scoped>
    .hallPlaces{
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
    }
     .row{
         padding: 0%;
        height: 30px
        /* padding: 1%;
        height:30px; */
    }
    .place{
        text-align: center;
        display: inline-block;
        width:30px;
        height:30px;
        position: relative;
    }
    .place:hover{
        cursor:pointer; 
        box-shadow:auto;
    }
    .place img.hallPlaces {
        position: absolute;
        left: 10%;
        z-index:5;
       
    }
    .indx{
        color:transparent;
    }
    .indx:hover img.hallPlaces {
    background: #999;
   }
  .indx:hover span {
   
    z-index: 20;
    position: relative;
    top: 2%;
    left: 2%;
    cursor: pointer;
    color: white;
    text-shadow: 2px 1px black;
}
.small{
    width:40px;
    display: inline-block;
    /* margin-right:1px; */
}
</style>
