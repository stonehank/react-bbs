

function generateConfig():{setConfig,readConfig,setLoggedUser,readLoggedUser}{


    /**
     *
     * appId:"#########-####",
        appKey:"#######",
        serverURLs:"#####.##.##.com",
        editMode:false,
        CommentClass:"Comments",
        CounterClass:"Counters",


        apiKey: '############',
        projectId: '########'
     */
    let configs={
        apiKey:null,
        projectId:null,
        appId:null,
        appKey:null,
        serverURLs:null,
        editMode:false,
        CommentClass:'Comments_demo',
        CounterClass:'Counters_demo',
        /*enum {firebase, leancloud}*/
        server:'firebase'
    }


    const stableConfig={
        UserClass:"_User",
        initialLoading:true,
        countMap:new Map(),
        pageviewMap:new Map(),
    }
    let loggedUser=null
    return {
        setConfig(newConfigs){
            configs = Object.assign({}, configs, newConfigs)
        },
        readConfig(){
            return Object.assign({}, configs, stableConfig)
        },
        setLoggedUser(user){
            loggedUser=user
        },
        readLoggedUser(){
            return loggedUser
        },
    }
}

export default generateConfig()
