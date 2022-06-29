// import LeanCloudLayer from "./server-layer/leancloud/ConvertLayer";
// import FirebaseLayer from "./server-layer/firebase/ConvertLayer";

type serverName = 'firebase' | 'leancloud'
type configType={
    apiKey?:string,
    projectId?:string,
    appId?:string,
    appKey?:string,
    serverURLs?:string,
    editMode?:boolean,
    CommentClass?:string,
    CounterClass?:string,
    server?:serverName
}
type stableConfigType={
    UserClass:string,
    initialLoading:boolean,
    countMap:any,
    pageviewMap:any,
}

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
let configs:configType={
    apiKey:null,
    projectId:null,
    appId:null,
    appKey:null,
    serverURLs:null,
    editMode:false,
    CommentClass:'Comments_demo',
    CounterClass:'Counters_demo',
    server:'leancloud'
}

const stableConfig:stableConfigType={
    UserClass:"_User",
    initialLoading:true,
    countMap:new Map(),
    pageviewMap:new Map(),
}
let loggedUser:any=null


function setConfig(newConfigs:configType):void{
    configs = Object.assign({}, configs, newConfigs)
}
function readConfig():configType & stableConfigType{
    return Object.assign({}, configs, stableConfig)
}
function setLoggedUser(user){
    loggedUser=user
}
function readLoggedUser(){
    return loggedUser
}

export {
    setConfig,
    readConfig,
    setLoggedUser,
    readLoggedUser
}
