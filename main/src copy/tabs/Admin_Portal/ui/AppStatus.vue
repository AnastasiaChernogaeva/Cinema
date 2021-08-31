<template>
   <span :class="['badge', className]"><slot/></span>
</template>

<script>
export default {
    props:['className'],
}
</script>

<style>

</style>