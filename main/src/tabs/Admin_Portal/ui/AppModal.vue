<template>
  <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal">
          <h3>Форма добавления</h3>
          <hr/>
          <slot/>
      </div>
  </div>
</template>

<script>
export default {
  emits:['close',],
}
</script>

<style>

</style>