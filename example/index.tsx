import 'react-app-polyfill/ie11';
import React, { useState} from 'react';
import {createRoot} from 'react-dom/client'
import { BBSPanel,BBSCounter, BBSPageView, setConfig } from '../.';
import {getFromCache, setCache} from '../src/utils/cacheControl'
import useDidUpdate from '../src/hooks/useDidUpdate'
import '../dist/react-bbs.css'
import './common.scss'
const SERVER_CACHE_KEY = 'react-bbs-demo-server-leancloud'

function switchServer(useLeancloud:boolean):void{
  if(useLeancloud){
    setConfig({
      appId:"rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
      appKey:"SDfR94mcAqIigfFpzMYfKTxT",
      editMode:true,
      serverURLs:"rywlo5pc.api.lncldglobal.com",
      CommentClass:"Comments_demo",
      CounterClass:"Counters_demo",
      server:"leancloud"
    })
  }else{
    setConfig({
      apiKey: 'AIzaSyAQTct1trRnIB7QLE9RZ6qZgHGahVNrvco',
      projectId: 'servelessbbs',
      editMode:true,
      CommentClass:"Comments_demo",
      CounterClass:"Counters_demo",
      server:"firebase"
    })
  }
}
const defaultUseLeancloud:boolean = getFromCache(SERVER_CACHE_KEY) || false
console.log(defaultUseLeancloud)
switchServer(defaultUseLeancloud)

const App = () => {
  const [useLeancloud, setUseLeancloud] = useState<boolean>(defaultUseLeancloud)
  const [nest, setNest] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(3)
  function addPageSize():void{
    setPageSize(pageSize + 1)
  }
  function minPageSize():void{
    setPageSize(Math.max(pageSize - 1,1))
  }
  function addNest():void{
    setNest(nest + 1)
  }
  function minNest():void{
    setNest(Math.max(nest - 1,1))
  }
  useDidUpdate(() => {
    console.log(useLeancloud)
    setCache(SERVER_CACHE_KEY, useLeancloud)
    window.location.reload()
  }, [useLeancloud])
  return (
    <div className='serverless-bbs'>
      <span>Comment counts:</span><BBSCounter />
      <br />
      <span>Page views:</span><BBSPageView />
      <section>
        <label>Select Server</label>
        <div style={{display:'flex', alignItems: 'center'}}>
            <button className={"mr-2 btn " + (useLeancloud ? 'info-color' : '')} onClick={()=>setUseLeancloud(true)}>Leancloud</Button>
            <button className={"btn " + (useLeancloud ? '' : 'info-color')} onClick={()=>setUseLeancloud(false)}>Firebase</Button>
        </div>
        <label>Set Comment Nest</label>
        <div style={{display:'flex', alignItems: 'center'}}>
            <span className="p-4">{nest}</span>
            <button className="mr-2 btn info-color" onClick={addNest}>+</button>
            <button className="btn info-color" onClick={minNest}>-</button>
        </div>
        <label>Set PageSize</label>
        <div style={{display:'flex', alignItems: 'center'}}>
            <span className="p-4">{pageSize}</span>
            <button className="mr-2 btn info-color" onClick={addPageSize}>+</button>
            <button className="btn info-color" onClick={minPageSize}>-</button>
        </div>
        <BBSPanel
          nest={nest}
          pageSize={pageSize}
        />
    </section>
    </div>
  );
};
const container=document.getElementById('root') as Element
const root = createRoot(container);
root.render(<App />);