<template>
    <div class="card">
    <button class="btn primary" @click="modal = true">
        Войти
    </button>
    <teleport to="body">
        <app-modal v-if="modal" @close="modal = false">
            <forgotten-password/>
        </app-modal>
    </teleport>
    </div>
</template>

<script>
import { ref } from "vue";
import AppModal from "../ui/AppModal.vue";
import ForgottenPassword from "../components/ForgottenPassword.vue";
export default {
    components:{
        AppModal, ForgottenPassword,
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