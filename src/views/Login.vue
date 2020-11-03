<template>
    <div id="login">
        <PasswordReset v-if="showForgotPassword" @close="toggleForgotPassword"/>
        <section>
            <div class="col1">
                <h2>Fire Vue App</h2>
                <p>
                    Hello world
                </p>
            </div>
            <div :class="{'signup-form': !showLogin}" class="col2">
                <form v-if="showLogin" @submit.prevent="login()">
                    <div>
                        <label for="email">E-Mail</label>
                        <input type="email"
                               required
                               placeholder="Enter your E-Mail"
                               id="email"
                               v-model.trim="loginForm.email">
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password"
                               required
                               placeholder="Enter your password"
                               id="password"
                               v-model.trim="loginForm.password"
                        >
                    </div>
                    <button type="submit" class="button">Log In</button>
                    <div class="extras">
                        <a @click="toggleForgotPassword()">Forgot password</a>
                        <a @click="toggleForm()">Create a new account</a>
                    </div>
                </form>
                <form v-else @submit.prevent="signup()">
                    <div>
                        <label for="email1">E-Mail</label>
                        <input type="email"
                               required
                               placeholder="Enter your E-Mail"
                               id="email1"
                               v-model.trim="signupForm.email">
                    </div>
                    <div>
                        <label for="password1">Password</label>
                        <input type="password"
                               required
                               placeholder="Enter your password"
                               id="password1"
                               v-model.trim="signupForm.password"
                        >
                    </div>
                    <div>
                        <label for="name">Name</label>
                        <input type="text"
                               required
                               placeholder="Enter your name"
                               id="name"
                               v-model.trim="signupForm.name">
                    </div>
                    <div>
                        <label for="title">Title</label>
                        <input type="text"
                               required
                               placeholder="Enter your title"
                               id="title"
                               v-model.trim="signupForm.title">
                    </div>
                    <button type="submit" class="button">Sign Up</button>
                    <div class="extras">
                        <a @click="toggleForm()">I have an account</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
    import PasswordReset from "../components/PasswordReset";
    export default {
        components: {
            PasswordReset
        },
        data() {
            return {
                showLogin: true,
                showForgotPassword: false,
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    name: '',
                    title: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                })
            },
            signup() {
                this.$store.dispatch('signup', {
                    email: this.signupForm.email,
                    password: this.signupForm.password,
                    name: this.signupForm.name,
                    title: this.signupForm.title,
                })
            },
            toggleForm() {
                this.showLogin = !this.showLogin
            },
            toggleForgotPassword() {
                this.showForgotPassword = !this.showForgotPassword
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
