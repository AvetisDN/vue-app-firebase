<template>
    <div class="modal">
        <div class="modal-shadow" @click="$emit('close')"></div>
        <div class="modal-content">
            <div class="close" @click="$emit('close')">&times;</div>
            <h3>Reset Password</h3>
            <div v-if="!showSuccess">
                <p>Enter your E-Mail to reset password</p>
                <form @submit.prevent="resetPassword()">
                    <input v-model.trim="email" type="email" placeholder="Your E-Mail">
                    <p class="error" v-if="errorMsg !== ''">{{errorMsg}}</p>
                    <button type="submit" class="button">Reset Password</button>
                </form>
            </div>
            <div v-else>Success! Check your E-Mail</div>
        </div>
    </div>
</template>

<script>
    import {auth} from "../firebase";

    export default {
        data() {
            return {
                email: '',
                showSuccess: false,
                errorMsg: ''
            }
        },
        methods: {
            async resetPassword() {
                this.errorMsg = ''
                try {
                    await auth.sendPasswordResetEmail(this.email)
                    this.showSuccess = true
                } catch (e) {
                    this.errorMsg = e.message
                }
            }
        }
    }
</script>

<style scoped>

</style>
