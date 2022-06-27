// import LeanCloudLayer from "./server-layer/leancloud/ConvertLayer";
// import FirebaseLayer from "./server-layer/firebase/ConvertLayer";

enum serverName{
    firebase ='firebase',
    leancloud ='leancloud',
}
type configType={
    apiKey:string,
    projectId:string,
    appId:string,
    appKey:string,
    serverURLs:string,
    editMode:boolean,
    CommentClass:string,
    CounterClass:string,
    server:serverName
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
    server:serverName.leancloud
}

const stableConfig:stableConfigType={
    UserClass:"_User",
    initialLoading:true,
    countMap:new Map(),
    pageviewMap:new Map(),
}
let loggedUser:any=null



const methods={
    setConfig(newConfigs){
        configs = Object.assign({}, configs, newConfigs)
    },
    readConfig():configType & stableConfigType{
        return Object.assign({}, configs, stableConfig)
    },
    setLoggedUser(user){
        loggedUser=user
    },
    readLoggedUser(){
        return loggedUser
    }
}

export default methods
