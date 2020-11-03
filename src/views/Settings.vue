<template>
    <section id="settings">
        <div class="col1">
            <h3>Settings</h3>
            <p>Update your profile data</p>

            <transition name="fade">
                <p v-if="showSuccess" class="success">Updated successfully</p>
            </transition>

            <form @submit.prevent="updateProfile()">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model.trim="name" :placeholder="userProfile.name" />
                <label for="title">Title:</label>
                <input type="text" id="title" v-model.trim="title" :placeholder="userProfile.title" />
                <button class="button">
                    Save
                </button>
            </form>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                showSuccess: false,
                name: '',
                title: ''
            }
        },
        methods: {
            updateProfile() {
                this.$store.dispatch('updateProfile', {
                    name: this.name !== '' ? this.name : this.userProfile.name,
                    title: this.title !== '' ? this.title : this.userProfile.title
                })

                this.name = ''
                this.title = ''

                this.showSuccess = true

                setTimeout(() => {
                    this.showSuccess = false
                }, 3000)
            }
        },
        computed: {
            ...mapState(['userProfile'])
        },
    }
</script>

<style lang="scss" scoped>

</style>
