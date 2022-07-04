import AV from './CustomAV'
import initAVObject from './initAVObject'
import { getFromCache, randUniqueString, setCache } from '../../utils'
import { readConfig, readLoggedUser } from '../../config'
import { APICoreInterface } from '../../types'

export default function useAPICore(): APICoreInterface {
  const { appId, appKey, serverURLs, CommentClass, CounterClass, UserClass, editMode, pageviewMap } = readConfig()
  const ownerCodeKey = 'serverless_react_bbs_ownerCode'
  let oldRandOwnerCode = getFromCache(ownerCodeKey)
  const newRandOwnerCode = oldRandOwnerCode || randUniqueString()
  const defaultUser = {
    id: null,
    attributes: {
      objectId: null,
      sessionToken: null,
      username: null
    }
  }
  let commentsPage = 1
  const errorCodeMsg = {
    100: 'Initialization failed, Please check your appId and appKey.',
    401: 'Unauthorized operation, Please check your appId and appKey.',
    403: 'Access denied by api domain white list, Please check your security domain.'
  }
  const loggedUser = readLoggedUser()

  /**
   * Vue -> $serverLessBBS
   * appId
   * appKey
   * serverURLs
   * CommentClass
   * CounterClass
   * UserClass
   */

  function serverInit() {
    return initAVObject({
      appId,
      appKey,
      serverURLs,
      CommentClass,
      CounterClass,
      UserClass
    })
  }
  /**
   * Required
   * 创建页面浏览量
   * 并保存到pageviewMap
   * @param uniqStr
   * @param title
   * @returns {Promise}<Number>
   */
  function __generatePageViews__(uniqStr, title) {
    const Ct = AV.Object.extend(CounterClass)
    const newCounter = new Ct()
    const acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(true)
    newCounter.setACL(acl)
    newCounter.set('uniqStr', uniqStr)
    newCounter.set('title', title)
    newCounter.set('time', 1)
    return newCounter
      .save()
      .then(() => {
        return 1
      })
      .catch((ex) => {
        console.error(errorCodeMsg[ex.code], ex)
        return 1
      })
  }
  /**
   * Required
   * 获取页面的浏览量
   * 并保存到pageviewMap
   * 不存在则先创建
   * @param uniqStr
   * @param title
   * @returns {Promise}<Number>
   */
  function fetchPageViews_server(uniqStr, title) {
    if (pageviewMap.has(uniqStr)) return pageviewMap.get(uniqStr)
    const query = new AV.Query(CounterClass)
    return query
      .equalTo('uniqStr', uniqStr)
      .find()
      .then((items) => {
        if (items.length === 0) {
          // 不存在当前页面，创建
          return __generatePageViews__(uniqStr, title)
        } else {
          if (items.length > 1) {
            console.warn('Warning! The uniqStr is not unique! Current uniqStr is: ' + uniqStr)
          }
          // 存在页面， 更新
          const item = items[0]
          const updateTime = item.get('time') + 1
          item.increment('time')
          item.set('title', title)
          return item
            .save()
            .then(() => {
              return updateTime
            })
            .catch(() => {
              return updateTime - 1
            })
        }
      })
      .catch((ex) => {
        console.error(errorCodeMsg[ex.code], ex)
        return __generatePageViews__(uniqStr, title)
      })
  }

  /**
   * Required
   * 获取评论数量
   * @param uniqStr
   * @param includeReply
   * @returns {Promise}<Number>
   */
  function fetchCounts_server(uniqStr, includeReply = false) {
    const query = new AV.Query(CommentClass)
    let searchPromise
    if (includeReply) {
      searchPromise = query.equalTo('uniqStr', uniqStr).count()
    } else {
      searchPromise = query
        .equalTo('uniqStr', uniqStr)
        .equalTo('replyId', '')
        .count()
    }
    return searchPromise
      .then((counts) => {
        return counts
      })
      .catch((ex) => {
        if (ex.code === 101) {
          return 0
        } else {
          console.error('Error happen in fetch count', ex)
          return 0
        }
      })
  }
  /**
     *
     * Required
     * {
     *      id:"6155bb945e0db15b17f31d78"
     *      attributes:{
     *          createdAt: "2021-09-30T13:28:52.022Z"
                        emailVerified: false
                        mobilePhoneVerified: false
                        objectId: "6155bb945e0db15b17f31d78"
                        sessionToken: "t8hllhe8e33yrae0jwlqcu8wa"
                        updatedAt: "2021-09-30T13:28:52.022Z"
                        username: "KsswXQGgsaGBEigmrgyrdhU5F8AAlRzv"
     *      }
     * }
     * @returns {Promise}<UserObject>
     */
  function signIn_server(): Promise<any> {
    if (loggedUser) return Promise.resolve(loggedUser)
    if (!editMode) return Promise.resolve(defaultUser)
    return new Promise((res) => {
      if (oldRandOwnerCode) {
        return AV.User.logIn(oldRandOwnerCode, oldRandOwnerCode)
          .then((user) => {
            console.log('Can login', user)
            return res(user)
          })
          .catch((err) => {
            console.log(err)
            return signUp_server().then((user) => res(user))
          })
      } else {
        return signUp_server().then((user) => res(user))
      }
    })
  }

  /**
   *
   * Required
   */
  function signUp_server(): Promise<any> {
    if (!editMode) return Promise.resolve(defaultUser)
    const user = new AV.User(UserClass)
    user.setUsername(newRandOwnerCode)
    user.setPassword(newRandOwnerCode)
    console.log('signUp_server', user.id, JSON.stringify(user))
    const acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    // acl.setReadAccess(user.id,true);
    // acl.setWriteAccess(user.id,true);
    acl.setPublicWriteAccess(false)
    user.setACL(acl)
    console.log('Can not get, try create new user')
    return user
      .save()
      .then((user) => {
        console.log('Create success')
        setCache(ownerCodeKey, newRandOwnerCode)
        oldRandOwnerCode = newRandOwnerCode
        return user
      })
      .catch((err) => {
        console.error(err)
        return defaultUser
      })
  }

  /**
   * Required
   * 更新编辑
   * @param objectId
   * @param message
   * @returns {Promise}<CommentObject>
   */
  function updateComment_server(objectId, message) {
    if (!editMode) return Promise.reject(new Error('Not in editMode'))
    const Ct = AV.Object.extend(CommentClass)
    const comment = new Ct({ objectId, message }, 'PUT')
    comment.set('message', message)
    return comment
      .save()
      .then((data) => data.attributes)
      .catch((err) => {
        console.error('update error!', err)
        return null
      })
  }

  /**
     * Required
     * uploadField
     * {
                  replyId: '',
                  email: '',
                  avatar: '',
                  link: '',
                  message: '',
                  at: '',
                  nickname: '',
                  uniqStr: props.uniqStr,

     * }
     * submit新的评论
     * @param uploadField
     * @returns {Promise}<CommentObject>
     */
  function uploadComment_server(uploadField) {
    const Ct = AV.Object.extend(CommentClass)
    const comment = new Ct()
    for (const k in uploadField) {
      if (!uploadField.hasOwnProperty(k)) continue
      comment.set(k, uploadField[k])
    }
    comment.set('url', window.location.href)
    const acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(false)
    return signIn_server()
      .then((user) => {
        // Set user_id
        comment.set('user_id', user.id)
        if (user.id) acl.setWriteAccess(user.id, true)
        comment.setACL(acl)
        return comment.save()
      })
      .then((response) => {
        console.log('upload,success', response)
        const data = response.attributes
        if (data.error) {
          console.error(data.error)
          return null
        }
        return data
      })
      .catch((ex) => {
        console.log('upload,error', ex, ex.code)
        console.error(ex.msg)
        return null
      })
  }

  /**
   * Required
   * @param uniqStr
   * @returns {Promise}<Array>[]
   */
  function fetchComments_server(uniqStr) {
    const pageSize = 1000
    return new AV.Query(CommentClass)
      .equalTo('uniqStr', uniqStr)
      .select(['nickname', 'rootId', 'message', 'link', 'pid', 'avatar', 'replyId', 'at', 'user_id'])
      .addDescending('createdAt')
      .skip((commentsPage - 1) * pageSize)
      .limit(pageSize)
      .find()
      .then((items) => {
        commentsPage++
        return items.map((obj) => obj.attributes)
      })
      .catch((ex) => {
        if (ex.code === 101) {
          return []
        } else {
          console.error('Error happen in fetch owner task', ex)
          return []
        }
      })
  }
  return {
    fetchComments_server,
    fetchCounts_server,
    fetchPageViews_server,
    serverInit,
    signIn_server,
    signUp_server,
    updateComment_server,
    uploadComment_server
  }
}
