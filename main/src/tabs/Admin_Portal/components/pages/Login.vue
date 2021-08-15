<template>
    <div>  
        <h1>Войти в аккаунт</h1>
        <form @submit.prevent="submitHandler">
            <div>
                <label for="login">Логин</label>
                <input
                    type="text"
                    id="login"
                    placeholder="Введите логин"
                    v-model.trim="login"
                >
                <small v-if="errors.login">{{errors.login}}</small>

                <label for="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    v-model.trim="password"
                >
                <small v-if="errors.password">{{errors.password}}</small>
            </div>

            <button>Войти</button>
            <button>Забыли пароль</button> 

        </form>    
     </div>
        

</template>

<script>
export default {
    

}
</script>

<style>

</style>