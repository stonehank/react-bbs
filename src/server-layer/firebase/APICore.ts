import {initializeApp} from "firebase/app";
import {
    getFirestore,
    increment,
    getDoc,
    setDoc,
    updateDoc,
    doc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    writeBatch
} from 'firebase/firestore/lite';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFromCache, randUniqueString, setCache} from "../../utils";
import configMethods from '../../config'
import {APICoreInterface} from "../../types";

const {readConfig, readLoggedUser} = configMethods
const {apiKey, projectId, CommentClass, CounterClass, pageviewMap, editMode} = readConfig()
let ownerCodeKey = 'serverless_react_bbs_ownerCode'
let oldRandOwnerCode = getFromCache(ownerCodeKey)
let newRandOwnerCode = oldRandOwnerCode || randUniqueString()
let defaultUser = {
    id: null,
    email: null,
}

const loggedUser = readLoggedUser()
let db: any = {}

function serverInit() {
    try {
        initializeApp({
            apiKey: apiKey,
            authDomain: projectId + '.firebaseio.com',
            projectId: projectId
        })
    } catch (_) {

    }
    db = getFirestore()
    return Promise.resolve()
}

function fetchComments_server(uniqStr) {
    let q = query(
        collection(db, CommentClass),
        where('uniqStr', '==', uniqStr),
        orderBy("createdAt", 'desc'),
        limit(1000));
    return getDocs(q)
        .then((querySnapshot) => {
            console.log(querySnapshot)
            let list = []
            querySnapshot.forEach((doc) => {
                list.push({
                    ...doc.data(),
                    objectId: doc.id,
                })
            })
            return list
        })
        .catch(error => {
            console.log('error', error)
            console.error(error.code, error.message)
            return []
        })
}

function fetchCounts_server(uniqStr, includeReply) {
    let commentRef = collection(db, CommentClass)
    let searchPromise
    if (includeReply) {
        searchPromise = getDocs(query(
            commentRef,
            where('uniqStr', '==', uniqStr)
        ))
    } else {
        searchPromise = getDocs(query(
            commentRef,
            where('uniqStr', '==', uniqStr),
            where('replyId', '==', '')
        ))
    }
    return searchPromise
        .then(querySnapshot => querySnapshot.docs.length)
        .catch(ex => {
            console.error('Error happen in fetch count', ex)
            return 0
        })
}

function fetchPageViews_server(uniqStr) {
    if (pageviewMap.has(uniqStr)) return pageviewMap.get(uniqStr)
    let docQuery = doc(db, CounterClass, encodeURIComponent(uniqStr))
    return getDoc(docQuery)
        .then(querySnapshot => {
            let data = querySnapshot.data()
            if (data) {
                updateDoc(docQuery, {time: increment(1)})
                return data.time + 1
            } else {
                setDoc(docQuery, {time: 1})
                return 1
            }
        })
}

/**
 *
 at: ""
 avatar: "https://www.gravatar.com/avatar/e6d43dc0ada4c59f086fe9c032552bb6?s=48"
 email: "stonehank310@gmail.com"
 message: "123"
 nickname: "stonehank"
 replyId: ""
 rootId: ""
 uniqStr: "http://localhost:8080/"
 * @param uploadField
 * @returns {Promise<*>}
 */
function uploadComment_server(uploadField) {
    let {email, ...publicField} = uploadField
    let timeStamp = new Date().toISOString()
    publicField.createdAt = timeStamp
    publicField.updatedAt = timeStamp
    let privateField = {
        email
    }
    console.log('ready upload')
    return signIn_server()
        .then((user) => {
            console.log('login done,', user)
            publicField.user_id = user.id || user.uid || ''
            return __uploadBatch__(user, publicField, privateField)
        })
        .catch(err => {
            console.error(err)
            throw new Error(err)
        })
}

function updateComment_server(id, message) {
    if (!editMode) return Promise.reject(null)
    let docQuery = doc(db, CommentClass, id)
    let returnData = {
        message: message,
        updatedAt: new Date().toISOString()
    }
    return signIn_server()
        .then(() => updateDoc(docQuery, {
            message: message,
            updatedAt: new Date().toISOString()
        }))
        .then(() => returnData)
        .catch(err => {
            console.error(err)
            return null
        })
}

function signIn_server(): Promise<any> {
    if (loggedUser) return Promise.resolve(loggedUser)
    if (!editMode) return Promise.resolve(defaultUser)
    let email = __getOwnerEmail__(oldRandOwnerCode)
    if (oldRandOwnerCode) {
        console.log('before login', email)
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, oldRandOwnerCode)
            // return firebase.auth().signInWithEmailAndPassword(email, oldRandOwnerCode)
            .then((userCredential) => {
                console.log('login success')
                return userCredential.user
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    console.log('no user', oldRandOwnerCode)
                } else {
                    console.error('login fail, resign up')
                    console.error(error.code, error.message)
                }
                return signUp_server()
            });
    }
    return signUp_server()
}

function signUp_server(): Promise<any> {
    if (!editMode) return Promise.resolve(defaultUser)
    let email = __getOwnerEmail__(newRandOwnerCode)
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, newRandOwnerCode)
        // return firebase.auth().createUserWithEmailAndPassword(email, newRandOwnerCode)
        .then((userCredential) => {
            // console.log('register success')
            setCache(ownerCodeKey, newRandOwnerCode)
            oldRandOwnerCode = newRandOwnerCode
            return userCredential.user
        })
        .catch((error) => {
            console.error('register fail')
            console.error(error.code, error.message, error)
        });
}

function __generatePageViews__() {
}

function __getOwnerEmail__(ownerKey) {
    return ownerKey + '@bbs-test.com'
}

function __uploadBatch__(user, publicField, privateField) {
    let batch = writeBatch(db);
    let publicDoc = doc(collection(db, CommentClass));
    batch.set(publicDoc, publicField);
    if (user.id) {
        let privateDoc = doc(db, CommentClass + '_private', user.id)
        batch.set(privateDoc, privateField, {merge: true})
    }
    return batch.commit().then(() => {
        console.log('All success!')
        return {
            objectId: publicDoc.id,
            ...publicField,
        }
    }).catch((err) => {
        console.error('Upload failed!');
        throw new Error(err)
    });
}

export default {
    serverInit,
    fetchComments_server,
    fetchCounts_server,
    fetchPageViews_server,
    uploadComment_server,
    updateComment_server,
    signIn_server,
    signUp_server
} as APICoreInterface
