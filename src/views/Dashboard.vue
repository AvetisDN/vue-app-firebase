<template>
    <div id="dashboard">
        <transition name="fade">
            <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
        </transition>
        <transition name="fade">
            <div v-if="showPostModal" class="p-modal">
                <div class="shadow" @click="closePostModal()"></div>
                <div class="p-container">
                    <a @click="closePostModal()" class="close">
                        &times;
                    </a>
                    <div class="post">
                        <h5>
                            {{fullPost.userName}}
                        </h5>
                        <span>
                            {{fullPost.createdOn | formatDate}}
                        </span>
                        <p>
                            {{fullPost.content}}
                        </p>
                        <ul>
                            <li>
                                <a>comments {{fullPost.comments}}</a>
                            </li>
                            <li>
                                <a>likes {{fullPost.likes}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="comments" v-show="postComments.length">
                        <div class="comment" v-for="comment in postComments" :key="comment.id">
                            <p>
                                {{comment.userName}}
                            </p>
                            <span>
                                {{comment.createdOn | formatDate}}
                            </span>
                            <p>
                                {{comment.content}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{userProfile.name}}</h5>
                    <p>{{userProfile.title}}</p>
                    <div class="create-post">
                        <p>create a post</p>
                        <form @submit.prevent="submitPost()">
                            <label for="content"></label>
                            <textarea id="content" name="content" v-model="post.content"></textarea>
                            <button type="submit" class="button">Post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <div v-if="posts.length">
                    <div v-for="post in posts" :key="post.id" class="post">
                        <h5>
                            {{post.userName}}
                        </h5>
                        <span>
                            {{post.createdOn | formatDate}}
                        </span>
                        <p>
                            {{post.content | trimLength}}
                        </p>
                        <ul>
                            <li>
                                <a @click="toggleCommentModal(post)">comments {{post.comments}}</a>
                            </li>
                            <li>
                                <a @click="likePost(post.id, post.likes)">likes {{post.likes}}</a>
                            </li>
                            <li>
                                <a @click="viewPost(post)">read full post</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <p class="no-results">
                        There're nothing in there
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import moment from 'moment'
    import CommentModal from '../components/CommentModal'
    import {commentsCollection} from '../firebase'

    export default {
        components: {
            CommentModal
        },
        data() {
            return {
                post: {
                    content: ''
                },
                showCommentModal: false,
                selectedPost: {},
                showPostModal: false,
                fullPost: {},
                postComments: []
            }
        },
        methods: {
            submitPost(){
                this.$store.dispatch('addPost', this.post)
                this.post.content = ''
            },
            toggleCommentModal(post) {
                this.showCommentModal = !this.showCommentModal
                if(this.showCommentModal) {
                    this.selectedPost = post
                } else {
                    this.selectedPost = {}
                }
            },
            likePost(id, likes) {
                this.$store.dispatch('likePost', {id, likes})
            },
            closePostModal() {
                this.postComments = []
                this.showPostModal = false
            },
            async viewPost(post) {
                const docs = await commentsCollection.where('postId', '==', post.id).orderBy('createdOn','asc').get()

                docs.forEach(doc => {
                    let comment = doc.data()
                    comment.id = doc.id
                    this.postComments.push(comment)
                })
                this.fullPost = post
                this.showPostModal = true
            }
        },
        computed: {
            ...mapState(['userProfile', 'posts'])
        },
        filters: {
            trimLength(val) {
                if(val.length < 150) return val;
                let tmp = val.substring(0,150)
                if(tmp.lastIndexOf(' ') < tmp.length - 1) {
                    tmp = tmp.substring(0, tmp.lastIndexOf(' '))
                }
                return `${tmp}...`
            },
            formatDate(val) {
                if(!val) return '-'
                let date = val.toDate()
                let now =  new Date()
                if(now - date < 24*3600*1000) return moment(date).fromNow()
                return date.toLocaleString('ru')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
