"use strict";(self.webpackChunk_tokenstreet_react_native_extended_stylesheet_website=self.webpackChunk_tokenstreet_react_native_extended_stylesheet_website||[]).push([[722],{9223:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"usage","title":"Usage","description":"1. Define styles using EStyleSheet.create() instead of StyleSheet.create():","source":"@site/docs/usage.md","sourceDirName":".","slug":"/usage","permalink":"/react-native-extended-stylesheet/docs/usage","draft":false,"unlisted":false,"editUrl":"https://github.com/tokenstreet-tech/react-native-extended-stylesheet/tree/main/packages/website/docs/usage.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Installation","permalink":"/react-native-extended-stylesheet/docs/installation"},"next":{"title":"Features","permalink":"/react-native-extended-stylesheet/docs/features"}}');var a=n(1085),r=n(1184);const l={sidebar_position:2},i="Usage",o={},c=[];function d(e){const t={code:"code",h1:"h1",header:"header",li:"li",ol:"ol",pre:"pre",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"usage",children:"Usage"})}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsxs)(t.li,{children:["Define styles using ",(0,a.jsx)(t.code,{children:"EStyleSheet.create()"})," instead of ",(0,a.jsx)(t.code,{children:"StyleSheet.create()"}),":"]}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:"/* component.js */\nimport EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';\n\n// define extended styles\nconst styles = EStyleSheet.create({\n    column: {\n        width: '80%', // 80% of screen width\n    },\n    text: {\n        color: '$textColor', // global variable $textColor\n        fontSize: '1.5rem', // relative REM unit\n    },\n    '@media (min-width: 350) and (max-width: 500)': {\n        // media queries\n        text: {\n            fontSize: '2rem',\n        },\n    },\n});\n\n// use styles as usual\nclass MyComponent extends React.Component {\n    render() {\n        return (\n            <View style={styles.column}>\n                <Text style={styles.text}>Hello</Text>\n            </View>\n        );\n    }\n}\n"})}),"\n",(0,a.jsxs)(t.ol,{start:"2",children:["\n",(0,a.jsxs)(t.li,{children:["In app entry point call ",(0,a.jsx)(t.code,{children:"EStyleSheet.build()"})," to actually calculate styles:"]}),"\n"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-jsx",children:"/* app.js */\nimport EStyleSheet from '@tokenstreet/react-native-extended-stylesheet';\n\nEStyleSheet.build({\n    // always call EStyleSheet.build() even if you don't use global variables!\n    $textColor: '#0275d8',\n});\n"})})]})}function u(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1184:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>i});var s=n(4041);const a={},r=s.createContext(a);function l(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);