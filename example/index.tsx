import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BBSPanel,BBSCounter, BBSPageView, setConfig } from '../.';
import '../dist/react-bbs.css'
// setConfig({
//   appId:"rYWlO5pCuJAiMPhGtmhvAaGv-MdYXbMMI",
//   appKey:"SDfR94mcAqIigfFpzMYfKTxT",
//   editMode:true,
//   serverURLs:"rywlo5pc.api.lncldglobal.com",
//   CommentClass:"Comments_demo",
//   CounterClass:"Counters_demo",
//   server:"leancloud"
// })

setConfig({
  apiKey: 'AIzaSyAQTct1trRnIB7QLE9RZ6qZgHGahVNrvco',
  projectId: 'servelessbbs',
  editMode:true,
  CommentClass:"Comments_demo",
  CounterClass:"Counters_demo",
  server:"firebase"
})
const App = () => {
  return (
    <div>
      <span>Comment counts:</span><BBSCounter />
      <br />
      <span>Page views:</span><BBSPageView />
      <BBSPanel
        nest={2}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
