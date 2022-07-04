var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { initializeApp } from 'firebase/app';
import { getFirestore, increment, getDoc, setDoc, updateDoc, doc, collection, getDocs, query, where, orderBy, limit, writeBatch } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFromCache, randUniqueString, setCache } from '../../utils';
import { readConfig, readLoggedUser } from '../../config';
var ownerCodeKey = 'serverless_react_bbs_ownerCode';
var oldRandOwnerCode = getFromCache(ownerCodeKey);
var newRandOwnerCode = oldRandOwnerCode || randUniqueString();
var defaultUser = {
    id: null,
    email: null
};
var db = {};
export default function useAPICore() {
    var _a = readConfig(), apiKey = _a.apiKey, projectId = _a.projectId, CommentClass = _a.CommentClass, CounterClass = _a.CounterClass, pageviewMap = _a.pageviewMap, editMode = _a.editMode;
    var loggedUser = readLoggedUser();
    function serverInit() {
        if (!apiKey || !projectId) {
            console.error('Server initial error: missing apiKey or projectId');
        }
        try {
            initializeApp({
                apiKey: apiKey,
                authDomain: projectId + '.firebaseio.com',
                projectId: projectId
            });
        }
        catch (_) {
            console.warn('Initial BBS App failed', _.message);
        }
        db = getFirestore();
        return Promise.resolve();
    }
    function fetchComments_server(uniqStr) {
        var q = query(collection(db, CommentClass), where('uniqStr', '==', uniqStr), orderBy('createdAt', 'desc'), limit(1000));
        return getDocs(q)
            .then(function (querySnapshot) {
            var list = [];
            querySnapshot.forEach(function (doc) {
                list.push(__assign(__assign({}, doc.data()), { objectId: doc.id }));
            });
            return list;
        })["catch"](function (error) {
            console.error(error.code, error.message);
            return [];
        });
    }
    function fetchCounts_server(uniqStr, includeReply) {
        var commentRef = collection(db, CommentClass);
        var searchPromise;
        if (includeReply) {
            searchPromise = getDocs(query(commentRef, where('uniqStr', '==', uniqStr)));
        }
        else {
            searchPromise = getDocs(query(commentRef, where('uniqStr', '==', uniqStr), where('replyId', '==', '')));
        }
        return searchPromise
            .then(function (querySnapshot) { return querySnapshot.docs.length; })["catch"](function (ex) {
            console.error('Error happen in fetch count', ex);
            return 0;
        });
    }
    function fetchPageViews_server(uniqStr) {
        if (pageviewMap.has(uniqStr))
            return pageviewMap.get(uniqStr);
        var docQuery = doc(db, CounterClass, encodeURIComponent(uniqStr));
        return getDoc(docQuery).then(function (querySnapshot) {
            var data = querySnapshot.data();
            if (data) {
                updateDoc(docQuery, { time: increment(1) });
                return data.time + 1;
            }
            else {
                setDoc(docQuery, { time: 1 });
                return 1;
            }
        });
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
        var email = uploadField.email, publicField = __rest(uploadField, ["email"]);
        var timeStamp = new Date().toISOString();
        publicField.createdAt = timeStamp;
        publicField.updatedAt = timeStamp;
        var privateField = {
            email: email
        };
        return signIn_server()
            .then(function (user) {
            console.log('login done,', user);
            publicField.user_id = user.id || user.uid || '';
            return __uploadBatch__(user, publicField, privateField);
        })["catch"](function (err) {
            console.error(err);
            throw new Error(err);
        });
    }
    function updateComment_server(id, message) {
        if (!editMode)
            return Promise.reject(new Error('Not in editMode'));
        var docQuery = doc(db, CommentClass, id);
        var returnData = {
            message: message,
            updatedAt: new Date().toISOString()
        };
        return signIn_server()
            .then(function () {
            return updateDoc(docQuery, {
                message: message,
                updatedAt: new Date().toISOString()
            });
        })
            .then(function () { return returnData; })["catch"](function (err) {
            console.error(err);
            return null;
        });
    }
    function signIn_server() {
        if (loggedUser)
            return Promise.resolve(loggedUser);
        if (!editMode)
            return Promise.resolve(defaultUser);
        var email = __getOwnerEmail__(oldRandOwnerCode);
        if (oldRandOwnerCode) {
            console.log('before login', email);
            var auth = getAuth();
            return (signInWithEmailAndPassword(auth, email, oldRandOwnerCode)
                // return firebase.auth().signInWithEmailAndPassword(email, oldRandOwnerCode)
                .then(function (userCredential) {
                console.log('login success');
                return userCredential.user;
            })["catch"](function (error) {
                if (error.code === 'auth/user-not-found') {
                    console.log('no user', oldRandOwnerCode);
                }
                else {
                    console.error('login fail, resign up');
                    console.error(error.code, error.message);
                }
                return signUp_server();
            }));
        }
        return signUp_server();
    }
    function signUp_server() {
        if (!editMode)
            return Promise.resolve(defaultUser);
        var email = __getOwnerEmail__(newRandOwnerCode);
        var auth = getAuth();
        return (createUserWithEmailAndPassword(auth, email, newRandOwnerCode)
            // return firebase.auth().createUserWithEmailAndPassword(email, newRandOwnerCode)
            .then(function (userCredential) {
            console.log('register success');
            setCache(ownerCodeKey, newRandOwnerCode);
            oldRandOwnerCode = newRandOwnerCode;
            return userCredential.user;
        })["catch"](function (error) {
            console.error('register fail');
            console.error(error.code, error.message, error);
        }));
    }
    function __getOwnerEmail__(ownerKey) {
        return ownerKey + '@bbs-test.com';
    }
    function __uploadBatch__(user, publicField, privateField) {
        var batch = writeBatch(db);
        var publicDoc = doc(collection(db, CommentClass));
        batch.set(publicDoc, publicField);
        if (user.id) {
            var privateDoc = doc(db, CommentClass + '_private', user.id);
            batch.set(privateDoc, privateField, { merge: true });
        }
        return batch
            .commit()
            .then(function () {
            console.log('All success!');
            return __assign({ objectId: publicDoc.id }, publicField);
        })["catch"](function (err) {
            console.error('Upload failed!');
            throw new Error(err);
        });
    }
    return {
        serverInit: serverInit,
        fetchComments_server: fetchComments_server,
        fetchCounts_server: fetchCounts_server,
        fetchPageViews_server: fetchPageViews_server,
        uploadComment_server: uploadComment_server,
        updateComment_server: updateComment_server,
        signIn_server: signIn_server,
        signUp_server: signUp_server
    };
}
//# sourceMappingURL=APICore.js.map