"use strict";(self.webpackChunk_tokenstreet_react_native_extended_stylesheet_website=self.webpackChunk_tokenstreet_react_native_extended_stylesheet_website||[]).push([[827],{876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},y=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),y=a,m=p["".concat(i,".").concat(y)]||p[y]||d[y]||o;return n?r.createElement(m,l(l({ref:t},u),{},{components:n})):r.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=y;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:a,l[1]=s;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}y.displayName="MDXCreateElement"},1698:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var r=n(7896),a=n(1461),o=(n(2784),n(876)),l=["components"],s={sidebar_position:2},i="Usage",c={unversionedId:"usage",id:"usage",title:"Usage",description:"1. Define styles using EStyleSheet.create() instead of StyleSheet.create():",source:"@site/docs/usage.md",sourceDirName:".",slug:"/usage",permalink:"/react-native-extended-stylesheet/docs/usage",draft:!1,editUrl:"https://github.com/tokenstreet-tech/react-native-extended-stylesheet/tree/main/packages/website/docs/usage.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/react-native-extended-stylesheet/docs/installation"},next:{title:"Features",permalink:"/react-native-extended-stylesheet/docs/features"}},u={},p=[],d={toc:p},y="wrapper";function m(e){var t=e.components,n=(0,a.Z)(e,l);return(0,o.kt)(y,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"usage"},"Usage"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Define styles using ",(0,o.kt)("inlineCode",{parentName:"li"},"EStyleSheet.create()")," instead of ",(0,o.kt)("inlineCode",{parentName:"li"},"StyleSheet.create()"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"/* component.js */\nimport EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';\n\n// define extended styles\nconst styles = EStyleSheet.create({\n    column: {\n        width: '80%', // 80% of screen width\n    },\n    text: {\n        color: '$textColor', // global variable $textColor\n        fontSize: '1.5rem', // relative REM unit\n    },\n    '@media (min-width: 350) and (max-width: 500)': {\n        // media queries\n        text: {\n            fontSize: '2rem',\n        },\n    },\n});\n\n// use styles as usual\nclass MyComponent extends React.Component {\n    render() {\n        return (\n            <View style={styles.column}>\n                <Text style={styles.text}>Hello</Text>\n            </View>\n        );\n    }\n}\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"In app entry point call ",(0,o.kt)("inlineCode",{parentName:"li"},"EStyleSheet.build()")," to actually calculate styles:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"/* app.js */\nimport EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';\n\nEStyleSheet.build({\n    // always call EStyleSheet.build() even if you don't use global variables!\n    $textColor: '#0275d8',\n});\n")))}m.isMDXComponent=!0}}]);