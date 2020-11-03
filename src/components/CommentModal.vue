<template>
    <div class="c-modal">
        <div class="shadow" @click="$emit('close')"></div>
        <div class="c-container">
            <a @click="$emit('close')">
                &times;
            </a>
            <p>add a comment</p>
            <form @submit.prevent="addComment()">
                <textarea v-model.trim="comment"></textarea>
                <button class="button" type="submit" :disabled="comment == ''">add comment</button>
            </form>
        </div>
    </div>
</template>
<script>
import {commentsCollection, postsCollection, auth} from "../firebase"

export default {
    props: ['post'],
    data() {
        return {
            comment: ''
        }
    },
    methods: {
        async addComment() {
            await commentsCollection.add({
                createdOn: new Date(),
                content: this.comment,
                postId: this.post.id,
                userId: auth.currentUser.uid,
                userName: this.$store.state.userProfile.name
            })
            await postsCollection.doc(this.post.id).update({
                comments: +this.post.comments + 1
            })

            this.$emit('close')
        }
    }
}
</script>