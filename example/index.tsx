import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ServerlessBBSPanel, setConfig } from '../.';
setConfig({
  appId:"rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
  appKey:"SDfR94mcAqIigfFpzMYfKTxT",
  editMode:true,
  serverURLs:"rywlo5pc.api.lncldglobal.com",
  CommentClass:"Comments_demo",
  CounterClass:"Counters_demo",
  server:"leancloud"
})
const App = () => {
  return (
    <div>
      <ServerlessBBSPanel />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
