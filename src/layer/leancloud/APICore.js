"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
var auth_1 = require("firebase/auth");
var utils_1 = require("../../utils");
var ownerCodeKey = 'serverless_react_bbs_ownerCode';
var oldRandOwnerCode = utils_1.getFromCache(ownerCodeKey);
var newRandOwnerCode = oldRandOwnerCode || utils_1.randUniqueString();
var defaultUser = {
    id: null,
    email: null,
};
var config_1 = require("../../config");
var readConfig = config_1.default.readConfig, readLoggedUser = config_1.default.readLoggedUser;
var _a = readConfig(), apiKey = _a.apiKey, projectId = _a.projectId, CommentClass = _a.CommentClass, CounterClass = _a.CounterClass, pageviewMap = _a.pageviewMap, editMode = _a.editMode;
var loggedUser = readLoggedUser();
var APICore = /** @class */ (function () {
    function APICore() {
    }
    APICore.prototype.serverInit = function () {
        try {
            app_1.initializeApp({
                apiKey: apiKey,
                authDomain: projectId + '.firebaseio.com',
                projectId: projectId
            });
        }
        catch (_) {
        }
        this.db = lite_1.getFirestore();
        return Promise.resolve();
    };
    APICore.prototype.fetchComments_server = function (uniqStr) {
        var q = lite_1.query(lite_1.collection(this.db, CommentClass), lite_1.where('uniqStr', '==', uniqStr), lite_1.orderBy("createdAt", 'desc'), lite_1.limit(1000));
        return lite_1.getDocs(q)
            .then(function (querySnapshot) {
            console.log(querySnapshot);
            var list = [];
            querySnapshot.forEach(function (doc) {
                list.push(__assign(__assign({}, doc.data()), { objectId: doc.id }));
            });
            return list;
        })
            .catch(function (error) {
            console.log('error', error);
            console.error(error.code, error.message);
            return [];
        });
    };
    APICore.prototype.fetchCounts_server = function (uniqStr, includeReply) {
        var commentRef = lite_1.collection(this.db, CommentClass);
        var searchPromise;
        if (includeReply) {
            searchPromise = lite_1.getDocs(lite_1.query(commentRef, lite_1.where('uniqStr', '==', uniqStr)));
        }
        else {
            searchPromise = lite_1.getDocs(lite_1.query(commentRef, lite_1.where('uniqStr', '==', uniqStr), lite_1.where('replyId', '==', '')));
        }
        return searchPromise
            .then(function (querySnapshot) { return querySnapshot.docs.length; })
            .catch(function (ex) {
            console.error('Error happen in fetch count', ex);
            return 0;
        });
    };
    APICore.prototype.fetchPageViews_server = function (uniqStr) {
        if (pageviewMap.has(uniqStr))
            return pageviewMap.get(uniqStr);
        var docQuery = lite_1.doc(this.db, CounterClass, encodeURIComponent(uniqStr));
        return lite_1.getDoc(docQuery)
            .then(function (querySnapshot) {
            var data = querySnapshot.data();
            if (data) {
                lite_1.updateDoc(docQuery, { time: lite_1.increment(1) });
                return data.time + 1;
            }
            else {
                lite_1.setDoc(docQuery, { time: 1 });
                return 1;
            }
        });
    };
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
    APICore.prototype.uploadComment_server = function (uploadField) {
        var _this = this;
        var email = uploadField.email, publicField = __rest(uploadField, ["email"]);
        var timeStamp = new Date().toISOString();
        publicField.createdAt = timeStamp;
        publicField.updatedAt = timeStamp;
        var privateField = {
            email: email
        };
        console.log('ready upload');
        return this.signIn_server()
            .then(function (user) {
            console.log('login done,', user);
            publicField.user_id = user.id || user.uid || '';
            return _this.__uploadBatch__(user, publicField, privateField);
        })
            .catch(function (err) {
            console.error(err);
            throw new Error(err);
        });
    };
    APICore.prototype.updateComment_server = function (id, message) {
        if (!editMode)
            return Promise.reject(null);
        var docQuery = lite_1.doc(this.db, CommentClass, id);
        var returnData = {
            message: message,
            updatedAt: new Date().toISOString()
        };
        return this.signIn_server()
            .then(function () { return lite_1.updateDoc(docQuery, {
            message: message,
            updatedAt: new Date().toISOString()
        }); })
            .then(function () { return returnData; })
            .catch(function (err) {
            console.error(err);
            return null;
        });
    };
    APICore.prototype.signIn_server = function () {
        var _this = this;
        if (loggedUser)
            return Promise.resolve(loggedUser);
        if (!editMode)
            return Promise.resolve(defaultUser);
        var email = this.__getOwnerEmail__(oldRandOwnerCode);
        if (oldRandOwnerCode) {
            console.log('before login', email);
            var auth = auth_1.getAuth();
            return auth_1.signInWithEmailAndPassword(auth, email, oldRandOwnerCode)
                // return firebase.auth().signInWithEmailAndPassword(email, oldRandOwnerCode)
                .then(function (userCredential) {
                console.log('login success');
                return userCredential.user;
            })
                .catch(function (error) {
                if (error.code === 'auth/user-not-found') {
                    console.log('no user', oldRandOwnerCode);
                }
                else {
                    console.error('login fail, resign up');
                    console.error(error.code, error.message);
                }
                return _this.signUp_server();
            });
        }
        return this.signUp_server();
    };
    APICore.prototype.signUp_server = function () {
        if (!editMode)
            return Promise.resolve(defaultUser);
        var email = this.__getOwnerEmail__(newRandOwnerCode);
        var auth = auth_1.getAuth();
        return auth_1.createUserWithEmailAndPassword(auth, email, newRandOwnerCode)
            // return firebase.auth().createUserWithEmailAndPassword(email, newRandOwnerCode)
            .then(function (userCredential) {
            // console.log('register success')
            utils_1.setCache(ownerCodeKey, newRandOwnerCode);
            oldRandOwnerCode = newRandOwnerCode;
            return userCredential.user;
        })
            .catch(function (error) {
            console.error('register fail');
            console.error(error.code, error.message, error);
        });
    };
    APICore.prototype.__generatePageViews__ = function () { };
    APICore.prototype.__getOwnerEmail__ = function (ownerKey) {
        return ownerKey + '@bbs-test.com';
    };
    APICore.prototype.__uploadBatch__ = function (user, publicField, privateField) {
        var batch = lite_1.writeBatch(this.db);
        var publicDoc = lite_1.doc(lite_1.collection(this.db, CommentClass));
        batch.set(publicDoc, publicField);
        if (user.id) {
            var privateDoc = lite_1.doc(this.db, CommentClass + '_private', user.id);
            batch.set(privateDoc, privateField, { merge: true });
        }
        return batch.commit().then(function () {
            console.log('All success!');
            return __assign({ objectId: publicDoc.id }, publicField);
        }).catch(function (err) {
            console.error('Upload failed!');
            throw new Error(err);
        });
    };
    return APICore;
}());
