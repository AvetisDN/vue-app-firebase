<template>
    <div id="app">
        <Menu v-if="showMenu"></Menu>
        <router-view/>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Menu from "./components/Menu";

    export default {
        components: {
            Menu
        },
        computed: {
            ...mapState(['userProfile']),
            showMenu() {
                return Object.keys(this.userProfile).length > 1
            }
        }
    }
</script>
