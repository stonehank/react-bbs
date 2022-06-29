/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// interface SvgrComponent extends StatelessComponent<React.SVGAttributes<SVGElement>> {}
//
// declare module '*.svg' {
//   const svgUrl: string
//   const svgComponent: SvgrComponent
//   export default svgUrl
//   export { svgComponent as ReactComponent }
// }

interface APICoreInterface {
  serverInit
  fetchComments_server
  fetchCounts_server
  fetchPageViews_server
  uploadComment_server
  updateComment_server
  signIn_server
  signUp_server
}

interface ConvertLayerIInterface {
  initialLoading: boolean
  fetchPageViews
  fetchCounts
  updateComment: (id: string, message: string) => Promise<CommentObject>
  uploadComment
  fetchCurrentUser
  fetchComments: (params: {
    uniqStr: string
    rootId: string
    replyId: string
    page: number
    pageSize: number
    deepReply: boolean
    deepReplyCounts: number
  }) => Promise<{
    data: CommentObject[]
    total: number
  }>
}

type CommentObject = {
  updatedAt: string
  objectId: string
  nickname: string
  rootId: string
  createdAt: string
  replyId: string
  at: string
  avatar: string
  user_id: string
  message: string
  replys: CommentObject[] | null
  replyCounts: number
}

type ReplyInfo = {
  at: string
  rootId: string
  replyId: string
}

type UserInfo = {
  avatar: string
  nickname: string
  email: string
}

type ConfigInfo = {
  uniqStr: string
  nest?: number
  pageSize?: number
  offset?: number
  editable?: boolean
}

type SingUserInfo = {
  id: string
  username?: string
  sessionToken?: string
  email?: string
}

type FetchCommentParams = {
  uniqStr: string
  rootId: string
  replyId: string
  page: number
  pageSize: number
  deepReply: boolean
  deepReplyCounts: number
}

type FetchCommentResult = {
  data: CommentObject[]
  total: number
}

type BBSPanelParams = {
  editable?: boolean
  pageSize?: number
  nest?: number
  offset?: number
  uniqStr?: string
}
type serverName = 'firebase' | 'leancloud'

type configType = {
  apiKey?: string | null
  projectId?: string | null
  appId?: string | null
  appKey?: string | null
  serverURLs?: string | null
  editMode?: boolean
  CommentClass?: string
  CounterClass?: string
  server?: serverName
}

type stableConfigType = {
  UserClass: string
  initialLoading: boolean
  countMap: any
  pageviewMap: any
}

declare module 'react-bbs' {
  // eslint-disable-next-line no-unused-vars
  import { NamedExoticComponent } from 'react'
  const ServerlessBBSPanel: NamedExoticComponent<BBSPanelParams>
  const setConfig: (newConfig: configType) => void
  export { ServerlessBBSPanel, setConfig }
}
