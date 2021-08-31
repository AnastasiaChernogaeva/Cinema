<template>
  <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal">
          <h3>Title</h3>
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