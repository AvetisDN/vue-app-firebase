import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import * as firebase from "../firebase";

Vue.use(Vuex)

firebase.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
    let postsArr = []

    snapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        postsArr.push(post)
    })

    store.commit('setPosts', postsArr)
})

const store = new Vuex.Store({
    state: {
        userProfile: {},
        posts: []
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPosts(state, val) {
            state.posts = val
        }
    },
    actions: {
        async login({dispatch}, form) {
            const {user} = await firebase.auth.signInWithEmailAndPassword(form.email, form.password)
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({commit}, user) {
            const userProfile = await firebase.usersCollection.doc(user.uid).get()
            commit('setUserProfile', userProfile.data())
            if(router.currentRoute.path === '/login') router.push('/')
        },
        async signup({dispatch}, form) {
            const {user} = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
            await firebase.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title
            })
            dispatch('fetchUserProfile', user)
        },
        async logout({commit}) {
            await firebase.auth.signOut()
            commit('setUserProfile', {})
            router.push('/login')
        },
        async addPost({state, commit}, post) {
            await firebase.postsCollection.add({
                createdOn: new Date(),
                content: post.content,
                userId: firebase.auth.currentUser.uid,
                userName: state.userProfile.name,
                comments: 0,
                likes: 0
            })
        },
        async likePost({commit}, post) {
            const userId = firebase.auth.currentUser.uid
            const docId = `${userId}_${post.id}`

            const doc = await firebase.likesCollection.doc(docId).get()
            if(doc.exists) {
                await firebase.likesCollection.doc(docId).delete()
                firebase.postsCollection.doc(post.id).update({
                    likes: +post.likes - 1
                })
            } else {
                await firebase.likesCollection.doc(docId).set({
                    postId: post.id,
                    userId: userId
                })
                firebase.postsCollection.doc(post.id).update({
                    likes: +post.likes + 1
                })
            }            
        },
        async updateProfile({dispatch}, user) {
            const userId = firebase.auth.currentUser.uid

            const userData = await firebase.usersCollection.doc(userId).update({
                name: user.name,
                title: user.title
            })

            dispatch('fetchUserProfile', {uid: userId})

            const postDocs = await firebase.postsCollection.where('userId', '==', userId).get()
            postDocs.forEach(doc => {
                firebase.postsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })
            const commentDocs = await firebase.commentsCollection.where('userId', '==', userId).get()
            commentDocs.forEach(doc => {
                firebase.commentsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })
        }
    },
    modules: {}
})

export default store