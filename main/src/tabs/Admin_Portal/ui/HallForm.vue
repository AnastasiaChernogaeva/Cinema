<template>
<div class="container">
    <form @submit.prevent="save"  >  
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
                <label><input type="checkbox" name="simplePl" v-model="simplePl" value="row"/>{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox">

            <span class="label">Выберите номера рядов с VIP местами</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" v-model="vipPl" value="row"/>{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox">

            <span class="label">Выберите номера рядов с местами для двоих</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" v-model="couplePl" value="row"/>{{row}}</label>
            </div>
        </div>

        <button class="btn" type="submit">Сохранить</button>
    </form>
</div>

</template>

<script>
import { ref, watch, reactive } from "vue";
export default {
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
    setup( _, {emit},){
        const rows = ref()
        const places = ref()
        const simplePl = reactive([])
        const vipPl = reactive([])
        const couplePl = reactive([])
        const info =  reactive ({})
        
        // watch(['rows', 'places', 'simplePl', 'vipPl', 'couplePl',], values=>{
        //     // console.log(values.value)
        //     // emit('hall',{
        //     //     val:{
        //     //         rows:values[0],
        //     //         places:values[1],
        //     //         simplePl:values[2],
        //     //         vipPl:values[3],
        //     //         couplePl:values[4],
        //     //     },                
        //     //     id:id,
        //     // })
        //     console.log(id)
        //     info[id] = {
        //             rows:values[0],
        //             places:values[1],
        //             simplePl:values[2],
        //             vipPl:values[3],
        //             couplePl:values[4],
        //         }
        //     console.log(info.value)
        // }
        // )

        // const save = ()=>{
        //     console.log(info.value);
        //     emit('hall',info)
        // }


        return{
            save,
            rows,
            places,
            simplePl,
            vipPl,
            couplePl,
        }
    }
}
</script>

<style>

</style>