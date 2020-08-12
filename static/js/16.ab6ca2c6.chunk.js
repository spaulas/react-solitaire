(this["webpackJsonpreact-solitaire"]=this["webpackJsonpreact-solitaire"]||[]).push([[16],{297:function(e,t,n){"use strict";var a=n(15),r=Object.freeze({createGame:function(){return{type:a.b.CREATE_GAME}},setInitialSavedGame:function(e){return{type:a.b.SET_INITIAL_GAME,savedGame:e}},toggleGameFlag:function(){return{type:a.b.TOGGLE_GAME_FLAG}},timeGame:function(){return{type:a.b.TIME_GAME}},saveGameTime:function(e){return{type:a.b.SAVE_GAME_TIME,time:e}},showingConfirm:function(e){return{type:a.b.SHOWING_CONFIRM,showingConfirm:e}},addGameHint:function(e,t){return{type:a.b.ADD_GAME_HINT,source:e,target:t}},addGameMove:function(e){return{type:a.b.ADD_GAME_MOVE,move:e}},removeGameMove:function(){return{type:a.b.REMOVE_GAME_MOVE}},reAddGameMove:function(){return{type:a.b.RE_ADD_GAME_MOVE}}});t.a=r},300:function(e,t,n){"use strict";var a=n(0),r=Object(a.createContext)({});t.a=r},305:function(e,t,n){"use strict";var a=n(95),r=Object.freeze({setStartPageAnimation:function(e){return{type:a.a.SET_START_PAGE_ANIMATION,value:e}},setConfirmationModal:function(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",i=arguments.length>5?arguments[5]:void 0;return{type:a.a.SET_CONFIRMATION_MODAL,message1:e,message2:t,onCancel:n,onConfirm:r,className:o,buttonConfirmId:i}}});t.a=r},315:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(335),i=n(14);t.a=function(e){var t=e.location,n=e.className,a=e.params,c=e.onClick,s=e.children,l=Object(i.g)();return r.a.createElement(o.a,{className:"buttonSpaceRow",align:"middle",justify:"center"},r.a.createElement("div",{className:"animatedButton divButton ".concat(n),onClick:function(){t?l.push(t,a):"function"===typeof c&&c()}},s))}},316:function(e,t,n){"use strict";var a=n(0),r=n(3),o=n.n(r),i=n(91),c=n(300),s=n(131);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var u=["xxl","xl","lg","md","sm","xs"],m={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},d=[],f=-1,g={},p={matchHandlers:{},dispatch:function(e){return g=e,!(d.length<1)&&(d.forEach((function(e){e.func(g)})),!0)},subscribe:function(e){0===d.length&&this.register();var t=(++f).toString();return d.push({token:t,func:e}),e(g),t},unsubscribe:function(e){0===(d=d.filter((function(t){return t.token!==e}))).length&&this.unregister()},unregister:function(){var e=this;Object.keys(m).forEach((function(t){var n=m[t],a=e.matchHandlers[n];a&&a.mql&&a.listener&&a.mql.removeListener(a.listener)}))},register:function(){var e=this;Object.keys(m).forEach((function(t){var n=m[t],a=function(n){var a,r,o,i=n.matches;e.dispatch(l(l({},g),(o=i,(r=t)in(a={})?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o,a)))},r=window.matchMedia(n);r.addListener(a),e.matchHandlers[n]={mql:r,listener:a},a(r)}))}};function b(e){return(b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function j(e,t){return!t||"object"!==b(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function G(e,t){return(G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"a",(function(){return A}));var w=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},A=(Object(s.a)("top","middle","bottom","stretch"),Object(s.a)("start","end","center","space-around","space-between"),function(e){function t(){var e;return h(this,t),(e=j(this,O(t).apply(this,arguments))).state={screens:{xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}},e.renderRow=function(t){var n,r=t.getPrefixCls,i=t.direction,s=e.props,l=s.prefixCls,u=s.justify,m=s.align,d=s.className,f=s.style,g=s.children,p=w(s,["prefixCls","justify","align","className","style","children"]),b=r("row",l),h=e.getGutter(),E=o()(b,(v(n={},"".concat(b,"-").concat(u),u),v(n,"".concat(b,"-").concat(m),m),v(n,"".concat(b,"-rtl"),"rtl"===i),n),d),j=y(y(y({},h[0]>0?{marginLeft:h[0]/-2,marginRight:h[0]/-2}:{}),h[1]>0?{marginTop:h[1]/-2,marginBottom:h[1]/2}:{}),f),O=y({},p);return delete O.gutter,a.createElement(c.a.Provider,{value:{gutter:h}},a.createElement("div",y({},O,{className:E,style:j}),g))},e}var n,r,s;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&G(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){var e=this;this.token=p.subscribe((function(t){var n=e.props.gutter;("object"===b(n)||Array.isArray(n)&&("object"===b(n[0])||"object"===b(n[1])))&&e.setState({screens:t})}))}},{key:"componentWillUnmount",value:function(){p.unsubscribe(this.token)}},{key:"getGutter",value:function(){var e=[0,0],t=this.props.gutter,n=this.state.screens;return(Array.isArray(t)?t:[t,0]).forEach((function(t,a){if("object"===b(t))for(var r=0;r<u.length;r++){var o=u[r];if(n[o]&&void 0!==t[o]){e[a]=t[o];break}}else e[a]=t||0})),e}},{key:"render",value:function(){return a.createElement(i.a,null,this.renderRow)}}])&&E(n.prototype,r),s&&E(n,s),t}(a.Component));A.defaultProps={gutter:0}},332:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){var t=e.className,a=void 0===t?"":t;return r.a.createElement("img",{className:a,src:n(179),alt:""})}},335:function(e,t,n){"use strict";var a=n(316);t.a=a.a},378:function(e,t,n){"use strict";var a=n(285),r=n(0),o=n.n(r),i=n(20);t.a=function(){var e=Object(i.c)((function(e){var t=e.Pages;return{onConfirm:t.confirmationModalProps.onConfirm,onCancel:t.confirmationModalProps.onCancel,message1:t.confirmationModalProps.message1,message2:t.confirmationModalProps.message2,buttonConfirmId:t.confirmationModalProps.buttonConfirmId,className:t.confirmationModalProps.className}})),t=e.onConfirm,n=e.onCancel,r=e.message1,c=e.message2,s=e.buttonConfirmId,l=e.className;return o.a.createElement("div",{className:"gameFullDiv ".concat(l)},o.a.createElement("div",{className:"resumeGameQuestion"},r),o.a.createElement("div",{className:"resumeGameQuestion resumeGameQuestion2"},c),"function"===typeof t&&o.a.createElement("div",{className:"animatedButton divButton resumeGameAnimatedButton resumeGameQuestion resumeQuestionAnswer ".concat(s?"resumeGameButton":""),onClick:t},o.a.createElement(a.a,{id:s||"confirm.yes"})),"function"===typeof n&&o.a.createElement("div",{className:"animatedButton divButton resumeGameAnimatedButton resumeGameQuestion resumeQuestionAnswer",onClick:n},o.a.createElement(a.a,{id:"confirm.no"})))}},834:function(e,t,n){"use strict";n.r(t);var a=n(71),r=n(0),o=n.n(r),i=n(20),c=n(332),s=n(378),l=n(285);var u=function(e){var t=e.loggedIn,n=e.hasSavedGame;return[{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step01"})),disableBeacon:!0,spotlightClicks:!1,target:".joyrideStartingPage",placement:"center"},!t&&{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step02"})),disableBeacon:!0,target:".joyrideLoginButton"},n&&{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step03"})),disableBeacon:!0,target:".joyrideResumeGameButton"},{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step04"})),disableBeacon:!0,target:".joyrideStartGameButton"},{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step05"})),disableBeacon:!0,target:".joyrideScoresButton"},{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step06"})),disableBeacon:!0,target:".joyrideStatisticsButton"},{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step07"})),disableBeacon:!0,target:".joyrideConfigurationsButton"},{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step08"})),disableBeacon:!0,target:".joyrideAboutButton"},t&&{content:o.a.createElement("h3",null,o.a.createElement(l.a,{id:"joyride.main.step09"})),disableBeacon:!0,target:".joyrideLogoutButton"}].filter((function(e){return!1!==e}))},m=n(315),d=n(56),f=n(297),g=n(83),p=n(305),b=n(14),y=n(50);var v=Object(r.memo)((function(e){var t=e.showStartAnimation,n=(e.showBackAnimation,Object(b.g)()),a=Object(i.b)(),r=Object(i.c)((function(e){var t=e.User;return{userName:t.user.userName,loggedIn:t.loggedIn,hasSavedGame:t.user.hasSavedGame,savedGame:t.user.savedGame}})),c=r.userName,s=r.loggedIn,u=r.hasSavedGame,v=r.savedGame,h=function(){return t?"startButtonAnimated":"loginButtonAnimated"},E=function(){a(f.a.showingConfirm(!1)),n.push("/game")},j=function(){a(f.a.showingConfirm(!1))};return o.a.createElement(o.a.Fragment,null,s&&o.a.createElement("div",{className:"welcomeMessage ".concat(h())},o.a.createElement(l.a,{id:"title.welcome"})," ",c),!s&&o.a.createElement(m.a,{location:"/login",className:"joyrideLoginButton ".concat(h())},o.a.createElement(l.a,{id:"btn.login"})),u?o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{location:"/game",params:{savedGame:v},className:"joyrideResumeGameButton ".concat(h())},o.a.createElement(l.a,{id:"btn.resumeGame"})),o.a.createElement(m.a,{onClick:function(){a(f.a.showingConfirm(!0)),a(p.a.setConfirmationModal(o.a.createElement(l.a,{id:"confirm.gameLostSaved"}),o.a.createElement(l.a,{id:"confirm.startNew"}),j,E,"adjustToGameOptions"))},className:"joyrideStartGameButton ".concat(h())},o.a.createElement(l.a,{id:"btn.startGame"}))):o.a.createElement(m.a,{location:"/game",className:"joyrideStartGameButton ".concat(h())},o.a.createElement(l.a,{id:"btn.startGame"})),o.a.createElement(m.a,{location:"/scores/userHighScores",className:"joyrideScoresButton ".concat(h())},o.a.createElement(l.a,{id:"sidebar.scores"})),o.a.createElement(m.a,{location:"/statistics",className:"joyrideStatisticsButton ".concat(h())},o.a.createElement(l.a,{id:"sidebar.statistics"})),o.a.createElement(m.a,{className:"joyrideConfigurationsButton ".concat(h()),location:"/configurations"},o.a.createElement(l.a,{id:"sidebar.configurations"})),o.a.createElement(m.a,{className:"joyrideAboutButton ".concat(h()),location:"/about"},o.a.createElement(l.a,{id:"sidebar.about"})),s&&o.a.createElement(m.a,{className:"joyrideLogoutButton ".concat(h()),onClick:function(){a(y.a.clearUser()),d.a.signOut(),a(y.a.getLocalStorage()),a(g.a.setOfflineHighScores())}},o.a.createElement(l.a,{id:"btn.logout"})))})),h=n(335),E=n(135);t.default=Object(r.memo)((function(){var e=Object(i.b)(),t=Object(i.c)((function(e){var t=e.Pages,n=e.User,a=e.GameBoard;return{showAnimation:t.startPageAnimation,loggedIn:n.loggedIn,hasSavedGame:n.user.hasSavedGame,showingConfirm:a.showingConfirm&&""!==t.confirmationModalProps.message1}})),n=t.showAnimation,l=t.loggedIn,m=t.hasSavedGame,d=t.showingConfirm,f=Object(r.useState)(n),g=Object(a.a)(f,2),b=g[0],y=g[1];return Object(r.useEffect)((function(){n?setTimeout((function(){e(E.a.initJoyride("main",u({loggedIn:l,hasSavedGame:m}))),e(p.a.setStartPageAnimation(!1))}),2500):e(E.a.initJoyride("main",u({loggedIn:l,hasSavedGame:m}))),y(n)}),[]),o.a.createElement(o.a.Fragment,null,d?o.a.createElement(s.a,null):null,o.a.createElement("div",{className:"joyrideStartingPage mainPage startingPage ".concat(n?"startingPageAnimation":""," ").concat(d?"blurBackground":"")},o.a.createElement(h.a,{className:"logoRow",align:"middle",justify:"center"},o.a.createElement(c.a,{className:"".concat(n?"logoAnimated":"logoImage")})),o.a.createElement(v,{showStartAnimation:n,showBackAnimation:b})))}))}}]);
//# sourceMappingURL=16.ab6ca2c6.chunk.js.map