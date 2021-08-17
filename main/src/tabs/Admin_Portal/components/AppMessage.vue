<template>
  <div :class="['alert',  'danger',]">
      <pre>{{message}}</pre>
      <p class="alert-title">
          Title
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem numquam blanditiis illum dolore beatae eum officiis laboriosam, eos incidunt ipsam in et nisi aperiam nam, repellendus at, impedit distinctio similique.</p>
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

        const message =  computed(()=> store.state.message)
        const closeMessage = store.commit('adminModule/clearMessage')

        return{message, closeMessage}
    }
}
</script>

<style>

</style>