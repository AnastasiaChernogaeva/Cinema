<template>
      <form class="card" @submit.prevent=""  >  
        <div :class="['form-control', {'invalid':eError},]" v-for = "(labelType, ind) of subtype.types" :key="ind"> 
                <label for="labelType.idName">{{labelType.fieldName}}</label>
                  <select  id="labelType.idName" v-model="labelType.forVModel" v-if="view">
                  <option value="spb">Санкт-Петербург</option>
                  <option value="msk">Москва</option>
                  <option value="kzn">Казань</option>
                  <option value="nsk">Новосибирск</option>
                </select>
                <input
                    v-else
                    type="labelType.fieldType"
                    id="labelType.idName"
                    v-model="labelType.forVModel"
                    @blur="eBlur"
                >
                
              

                <small v-if="eError">{{eError}}</small>
        </div>

  


         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

        </form> 
</template>

<script>
export default {

}
</script>

<style>

</style>