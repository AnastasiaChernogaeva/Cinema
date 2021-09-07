<template>
  <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal">
          <h2>Поиск</h2>
          <slot/>
      </div>
  </div>
</template>

<script>
export default {
  emits:['close',],
}
</script>

<style scoped>
 .modal{
       text-align: center;
 }
</style>