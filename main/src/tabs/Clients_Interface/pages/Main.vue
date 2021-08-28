<template> 
<div class="card">
    <the-nav-bar></the-nav-bar>
   
    <!-- <button class="btn primary" @click="modal = true">
        Войти
    </button> -->
    <!-- <teleport to="body">
        <app-modal v-if="modal" @close="modal = false">
            <forgotten-password/>
        </app-modal>
    </teleport> -->
    </div>
</template>

<script>
import { ref } from "vue";
import AppModal from "../ui/AppModal.vue";
import ForgottenPassword from "../components/ForgottenPassword.vue";
import TheNavBar from '../../Clients_Interface/ui/TheNavBar.vue';
export default {
    components:{
        AppModal, ForgottenPassword,
        TheNavBar,
    },
    setup(){
        const modal = ref(false)

        return{
            modal,
        }
    }
}
</script>

<style>

</style>