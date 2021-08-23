<template>
<div class="container">
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

</div>

</template>

<script>
import { ref } from "vue";
export default {
    props:['id', 'modelValue'],
    emits:['update:modelValue'],
    setup(){
        const rows = ref()
        const places = ref()
        const simplePl = ref([])
        const vipPl = ref([])
        const couplePl = ref([])
        
        watch([rows, places, simplePl, vipPl, couplePl,], values=>{
            emit('update:modelValue',{
                rows:values[0],
                places:values[1],
                simplePl:values[2],
                vipPl:values[3],
                couplePl:values[4],
            })
        })


        return{
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