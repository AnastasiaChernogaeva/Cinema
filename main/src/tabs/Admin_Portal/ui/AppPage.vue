<template>
    <div class="card">
        <h1 class="card-title">
            {{subtitle}}
            <slot name="header"/>
        </h1>
        <slot/>
    </div>
</template>

<script>
export default {
    props:{
        subtitle:{
            type:String,
            required:true,
        }
    },

    setup(props){
        document.title =  `${props.subtitle} | Админский портал`
    }
}
</script>

<style>

</style>