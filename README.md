
>> Serverless BBS(comment system) in React


## Support Server

* Leancloud
* Firebase
* Custom backend

    Need follow the interface

    [APICoreInterface](https://github.com/stonehank/react-bbs/blob/main/src/types.ts#L1)

    [ConvertLayerIInterface](https://github.com/stonehank/react-bbs/blob/main/src/types.ts#L12)

## DEMO
[https://stonehank.github.io/react-bbs](https://stonehank.github.io/react-bbs)


## Install

`npm install react-bbs`


## Config

##### Leancloud

```js
// index.js
import { setConfig } from 'react-bbs';

setConfig({
    appId:"#########-####",
    appKey:"#######",
    serverURLs:"#####.##.##.com",
    editMode:false,
    CommentClass:"Comments",
    CounterClass:"Counters",
    server:"leancloud"
})
```

##### Firebase

```js
// index.js
import { setConfig } from 'react-bbs';

setConfig({
    apiKey: '############',
    projectId: '########',
    editMode:false,
    CommentClass:"Comments",
    CounterClass:"Counters",
    server:'firebase',
})
```

## Usage

`<BBSPanel />` The BBS main panel

`<BBSCounter />` Current page total comment records count

`<BBSPageView />` Current page total page viewer

```js
// Component.js
import React from 'react';
import { BBSPanel,BBSCounter, BBSPageView,} from '../.';

const App = () => {
  return (
    <main>
        <span>Comment counts:</span><BBSCounter uniqStr="demo-page-001"/>
        <br />
        <span>Page views:</span><BBSPageView uniqStr="demo-page-001"/>
        <section>
            <BBSPanel
                nest={2}
                pageSize={5}
                uniqStr="demo-page-001"
            />
        </section>
    </div>
  );
};
const container=document.getElementById('root') as Element
const root = createRoot(container);
root.render(<App />);
```

## Props

#### Leancloud

|prop|required|description|default|
|:---:|:---:|:---:|:---:|
|appId|required|appId in leancloud|null|
|appKey|required|appKey in leancloud|null|
|serverURLs|optional|LeanCloud api address([How to get](#serverURLs))|null|
|CommentClass|required|Comment class name in leancloud|Comment|
|CounterClass|required|Pageview class name in leancloud|Counter|
|editMode|optional|User able to edit message|false|
|server|required|Define the server type |"leancloud"|

#### Firebase

|prop|required|description|default|
|:---:|:---:|:---:|:---:|
|apiKey|required|apiKey in firebase|null|
|projectId|required|projectId in firebase|null|
|CommentClass|required|Comment class name in firebase|Comment|
|CounterClass|required|Pageview class name in firebase|Counter|
|editMode|optional|User able to edit message|false|
|server|required|Define the server type |"firebase"|



#### Component BBSPanel

|prop|required|description|default|
|:---:|:---:|:---:|:---:|
|nest|optional|Defined the nest layers of the reply list|1|
|pageSize|optional|Defined the comment records in one time render|10|
|offset|optional|App menu with `fixed`, can pass the scroll offset|0|
|[uniqStr](#uniqstr)|optional|A unique string, use for fetch the specific page comment list|location.origin + location.pathname|


#### Component BBSCounter

|prop|required|description|default|
|:---:|:---:|:---:|:---:|
|size|optional|Loading icon size|16|
|[uniqStr](#uniqstr)|optional|A unique string, use for fetch the specific page comment records count|location.origin + location.pathname|

#### Component BBSPageView

|prop|required|description|default|
|:---:|:---:|:---:|:---:|
|size|optional|Loading icon size|16|
|[uniqStr](#uniqstr)|optional|A unique string, use for fetch the specific page view|location.origin + location.pathname|



## Q & A

#### uniqStr

It's good to pass uniqStr manually as a uniqual string for every different page.

For every different page, we should have different key to fetch the comment records, by default, the uinqStr is `location.origin + location.pathname`

But in some case which page url have hash, 

e.g.
 
1. If you want to fetch the page's `https://someurl#page=1` reply counts in another page `https://someurl#page=2`.

2. These two pages have same exact URL, but the different hash

In the above case, by the default uniqStr, it can't fetch the correct comment records.

