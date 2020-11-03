import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC_3ObP2P418dZhyVUmzIsQkYoEgWtgdS4",
    authDomain: "vue-app-59765.firebaseapp.com",
    databaseURL: "https://vue-app-59765.firebaseio.com",
    projectId: "vue-app-59765",
    storageBucket: "vue-app-59765.appspot.com",
    messagingSenderId: "898353103850",
    appId: "1:898353103850:web:aa05cb7f973b1a9e42e893"
}
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
