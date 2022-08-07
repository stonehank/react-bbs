/**
 *
 appId:"#########-####",
 appKey:"#######",
 serverURLs:"#####.##.##.com",
 editMode:false,
 CommentClass:"Comments",
 CounterClass:"Counters",

 apiKey: '############',
 projectId: '########'
 */
import { configType, SignUserInfo, stableConfigType } from './types';

let configs: configType = {
  apiKey: null,
  projectId: null,
  appId: null,
  appKey: null,
  serverURLs: null,
  editMode: false,
  CommentClass: 'Comments_demo',
  CounterClass: 'Counters_demo',
  server: 'firebase'
}

const stableConfig: stableConfigType = {
  UserClass: '_User',
  initialLoading: true,
  countMap: new Map(),
  pageviewMap: new Map()
}
let loggedUser: SignUserInfo

function setConfig(newConfigs: configType): void {
  console.log(newConfigs.server)
  configs = Object.assign({}, configs, newConfigs)
}
function readConfig(): configType & stableConfigType {
  return Object.assign({}, configs, stableConfig)
}
function setLoggedUser(user: SignUserInfo) {
  loggedUser = user
}
function readLoggedUser() {
  return loggedUser
}

export { setConfig, readConfig, setLoggedUser, readLoggedUser }
