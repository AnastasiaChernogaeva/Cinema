<template>
<div class="container">
   <div v-if="open === false" class="formhall"> <button class="btn danger" @click="open = true">Сформировать зал {{id}}</button></div>
    <form @submit.prevent="save" v-else-if="isReadyHall === false"  >  
    <h2>План зала {{id}}</h2>
  <div class="form-control">
        <label for="rows">Количество рядов</label>
          <input
                type="number"
                id="rows"
                v-model="rows"
                @blur="rowsBlur"
        >
  </div>
  <div class="form-control">
        <label for="places">Количество мест в одном ряду </label>
          <input
                type="number"
                id="places"
                v-model="places"
                @blur="placesBlur"
        >
    </div>
        <div class="form-checkbox">

            <span class="label">Выберите номера рядов с обычными местами</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="simplePl" v-model="simplePl" :value="row"/>{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox">

            <span class="label">Выберите номера рядов с VIP местами</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" v-model="vipPl" :value="row"/>{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox">

            <span class="label">Выберите номера рядов с местами для двоих</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" v-model="couplePl" :value="row"/>{{row}}</label>
            </div>
        </div>

        <button class="btn" type="submit" >Сохранить</button>
    </form>
     <canvas-halls v-if="isReadyHall" :info="info"></canvas-halls>
</div>

</template>

<script>
import { ref, watch, reactive } from "vue";
import CanvasHalls from "../canvas/CanvasHalls.vue"


export default {
    components:{
        CanvasHalls,
    },
    props:['id'],
    emits:['hall'],
    // data(){
    //     return{
    //         rows:0,
    //         places:0,
    //         simplePl:[],
    //         vipPl:[],
    //         couplePl:[],
    //         info:{},
    //     }
    // },
    // methods: {
    //     save () {
    //                 info[id] = {
    //                 rows:values[0],
    //                 places:values[1],
    //                 simplePl:values[2],
    //                 vipPl:values[3],
    //                 couplePl:values[4],
    //             }
    //     },
    // },
    // watch
    setup( props, {emit},){
        const rows = ref()
        const places = ref()
        const simplePl = ref([])
        const vipPl = ref([])
        const couplePl = ref([])
        const info =  reactive ({})
        const open = ref(false)
        const isReadyHall = ref(false)

        
        // watch(['rows', 'places', 'simplePl', 'vipPl', 'couplePl',], values=>{
        //     console.log(values)
        //     emit('hall',{
        //         val:{
        //             rows:values[0],
        //             places:values[1],
        //             simplePl:values[2],
        //             vipPl:values[3],
        //             couplePl:values[4],
        //         },                
        //         id:id,
        //     })
        //     console.log(id)
        //     info[id] = {
        //             rows:values[0],
        //             places:values[1],
        //             simplePl:values[2],
        //             vipPl:values[3],
        //             couplePl:values[4],
        //         }
        //     console.log(values)
        // }
        // )

        const save = ()=>{
            info.value = {
                val:{
                    rows:rows.value,
                    places:places.value,
                    simplePl:simplePl.value,
                    vipPl:vipPl.value,
                    couplePl:couplePl.value,
                },                
                id:props.id,
            }
            // console.log(info.value);
            isReadyHall.value = true
            emit('hall',info)
        }


        return{
            save,
            rows,
            places,
            simplePl,
            vipPl,
            couplePl,
            open,
            info,
            isReadyHall
        }
    }
}
</script>

<style scoped>
    .formhall{
        margin:5%;
    }
</style>