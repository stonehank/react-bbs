import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import {setConfig} from './config'

setConfig({
    appId:"rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
    appKey:"SDfR94mcAqIigfFpzMYfKTxT",
    editMode:true,
    serverURLs:"rywlo5pc.api.lncldglobal.com",
    CommentClass:"Comments_demo",
    CounterClass:"Counters_demo",
    server:"leancloud"
})

// setConfig({
//     editMode:true,
//     CommentClass:"Comments_demo",
//     CounterClass:"Counters_demo",
//     apiKey: 'AIzaSyAQTct1trRnIB7QLE9RZ6qZgHGahVNrvco',
//     projectId: 'servelessbbs',
//     server:'firebase'
// })

ReactDOM.render(
    <App />, document.getElementById('root'));
