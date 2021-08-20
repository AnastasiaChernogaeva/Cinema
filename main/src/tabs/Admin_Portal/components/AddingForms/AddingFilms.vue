<template>
         <form class="card" @submit.prevent="onSubmit"  >  
        <div :class="['form-control', {'invalid':fnError},]"> 
                <label for="filmName">Название</label>
                <input
                    type="text"
                    id="filmName"
                    v-model="filmName"
                    @blur="fnBlur"
                >
                <small v-if="fnError">{{fnError}}</small>
      </div>

        <div :class="['form-control', {'invalid':descError},]"> 
                <label for="filmDescription">Описание</label>
                <textarea
                    type="text"
                    id="filmDescription"
                    v-model="filmDescription"
                    @blur="descBlur"
                ></textarea>
                <small v-if="descError">{{descError}}</small>
  </div>

  
  <div :class="['form-control', {'invalid':stimeError},]"> 
                <label for="startTime">Начало показа</label>
                <input
                    type="date"
                    id="startTime"
                    v-model="startTime"
                    @blur="stimeBlur"
                >
                <small v-if="stimeError">{{stimeError}}</small>
  </div>

          <div :class="['form-control', {'invalid':ftimeError},]"> 
                <label for="finishTime">Окончание показа</label>
                <input
                    type="date"
                    id="finishTime"
                    v-model="finishTime"
                    @blur="ftimeBlur"
                >
                <small v-if="ftimeError">{{ftimeError}}</small>
      </div>

  



         

            <button class="btn primary" type="submit" :disabled="isSubmitting" >Добавить</button>      

        </form> 
</template>
<script>
import { useFilmsForms } from "../../use/films-forms";

export default {
    setup(){

        return{
            ...useFilmsForms()
        }
    
    }

}
</script>

<style>

</style>