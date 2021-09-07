<template>
    <div class="row" v-if="$route.path.split('/')[1]==='cinema'"  >
        <div class="small">{{rId}}</div>
        <div class="place" v-for="(place,idx) in places" :key="idx" @click="choosePlace(idx+1, rId)" >
    <span class="indx" 
            :class="[
                 {'chosenSpan':infoArr && infoArr.find(info=>info.place===idx+1)},
                 {'isBooked':boughtT.find(boughtTInfo=>boughtTInfo.place===idx+1)||occupiedPlaces&&occupiedPlaces.find(elem=>elem.place === idx+1) },
                 ]"
            >
                <span>{{idx+1}}</span>

          <img src="./icons/2x/simple.png" alt="simple hall places " class="hallPlaces simple" 
          :class="[
                {'chosen':infoArr && infoArr.find(info=>info.place===idx+1)},
                {'isBooked':boughtT.find(boughtTInfo=>boughtTInfo.place===idx+1)||occupiedPlaces&&occupiedPlaces.find(elem=>elem.place === idx+1) }                ]" 
                v-if="simplePl &&simplePl.includes(rId)" >
          <img src="./icons/2x/vip.png" alt="vip hall places" class="hallPlaces vip" 
          :class="[
                {'chosen':infoArr && infoArr.find(info=>info.place===idx+1)},
                {'isBooked':boughtT.find(boughtTInfo=>boughtTInfo.place===idx+1)||occupiedPlaces&&occupiedPlaces.find(elem=>elem.place === idx+1)  },
                ]" 
                v-if="vipPl&&vipPl.includes(rId)" >
          <img src="./icons/2x/couple.png" alt="couple hall places" class="hallPlaces couple"
          :class="[
                {'chosen':infoArr && infoArr.find(info=>info.place===idx+1)},
                {'isBooked':boughtT.find(boughtTInfo=>boughtTInfo.place===idx+1)||occupiedPlaces&&occupiedPlaces.find(elem=>elem.place === idx+1) },
                ]"
                v-if="couplePl&&couplePl.includes(rId)" >
</span>
        </div>


   </div>
         <div class="row" v-else >
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
import {computed, ref, watch, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    props:[
            'rId',
            'simplePl',
            'vipPl',
            'couplePl',
            'places',
            'book',
            'occupiedPlaces'
    ],
    emits:['choosePlace'],
    setup(props, {emit}){
        const route = useRoute()
        const store = useStore()
        const placesrowsBooked = ref([])
        const infoAboutPlaceAndRow = ref({})
        const infoArr = ref([])
        const boughtT = ref([])

        watch(()=>props.occupiedPlaces, ()=>{
            // console.log('rowOccupiedPlaces', props.occupiedPlaces);
        })

// ??????????????????????????????
    // if(props.occupiedPlaces!==undefined){
        // console.log('Occupy Places',props.occupiedPlaces);
        // console.log('Array', Array.from(props.occupiedPlaces));
    //    let row = props.occupiedPlaces.find(arr=>arr.filter(row=>row.row===props.rId))
    // //    console.log('row',row);
    //    row.forEach(element => {
    //        placesrowsBooked.value.push(element.place)
    //    });
       
    //    console.log( placesrowsBooked.value);
    // }



        const choosePlace = (idPlace, rId)=>{

        if(boughtT.value.find(el=>el.place === idPlace && el.row === rId)===undefined && props.occupiedPlaces?props.occupiedPlaces.find(el=>el.place === idPlace && el.row === rId)===undefined:!props.occupiedPlaces ) {
            let type=''
            if(infoArr.value.find(el=>el.place === idPlace && el.row === rId)){
                let elem = infoArr.value.find(el=>el.place === idPlace && el.row === rId)
                let indx = infoArr.value.indexOf(elem)
                infoArr.value.splice(indx,1)
            }
            else{

           
                if(props.simplePl && props.simplePl.includes(rId)){
                    type='simplePl'
                }
                else if(props.vipPl&& props.vipPl.includes(rId)){
                    type='vipPl'
                }
                else if(props.couplePl&&props.couplePl.includes(rId)){
                    type='couplePl'
                }
                infoAboutPlaceAndRow.value={'row':props.rId,'place':idPlace, 'type':type }
                infoArr.value.push(infoAboutPlaceAndRow.value)
            }
            emit('choosePlace', infoArr.value)
        }
        else{
                // console.log('Nothing has changed');
        }
        }
         
            watch(()=>props.book, (newValue, oldValue) => {
                if(newValue!==oldValue){
                    if(newValue === true){
                        if(infoArr.value.length!==0){
                            boughtT.value=infoArr.value
                            // console.log(boughtT.value);
                            emit('buyPlaces', boughtT.value)
                            infoArr.value = []
                        }
                    }
                    else if(newValue === false){
                        // console.log(boughtT.value);
                    }
                } else{
                    // console.log('have no changes');
                }

        })

     

        // onMounted(
        //     async()=>{
        //         await store.dispatch('gettingInfo/load', {rType:'orders'})
        //     }
        // )
        // const orders = computed(()=> store.getters['gettingInfo/orders']
        // .forEach(order => {
        //     places.value.push(order.places)
        // })
        // )


        return{
            choosePlace,
            infoArr,
            boughtT,
            placesrowsBooked
        }
    }
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
    .isBooked{
         background: rgb(255, 191, 226);
    }
    .chosen{
        background: #999;
    }
    .chosenSpan span{
    z-index: 20;
    position: relative;
    top: 2%;
    left: 2%;
    cursor: pointer;
    color: white;
    text-shadow: 2px 1px black;
    }
     .row{
         padding: 0%;
        height: 30px;
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
