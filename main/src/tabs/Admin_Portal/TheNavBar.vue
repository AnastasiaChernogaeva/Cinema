<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/admin/allInfo">Все фильмы</router-link>
            </li>
             <li>
                <router-link to="/admin/adding">Добавить</router-link>
            </li>
             <!-- <li>
                <router-link to="/login">Выйти</router-link>
            </li> -->
             <li>
                <router-link to="#">Выйти</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>