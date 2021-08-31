<template>
  <div :class="['alert', message.type,]" v-if="message">
      <p class="alert-title">
         {{title}}
      </p>
      <p>{{message.value}}</p>
      <span class="alert-close" @click="closeMessage">
          &times;
      </span>
  </div>

</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()
        const TITLE_MAP = {
            primary: 'Успешно!',
            danger: 'Ошибка!',
            warning: 'Внимание!'
        }
        const message =  computed(()=> store.getters['clients/message'])
        const title = computed(()=>message.value?TITLE_MAP[message.value.type]:null)

        return{
            title,
            message, 
            closeMessage: ()=>store.commit('clients/clearMessage'),
            }
    }
}
</script>

<style>

</style>