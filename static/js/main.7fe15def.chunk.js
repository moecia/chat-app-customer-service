(this["webpackJsonpchat-app-customer-service"]=this["webpackJsonpchat-app-customer-service"]||[]).push([[0],{128:function(e,t,s){},129:function(e,t,s){},130:function(e,t,s){},134:function(e,t,s){},145:function(e,t,s){},147:function(e,t,s){},151:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s.n(a),c=s(23),i=s.n(c),r=s(116),o=s(22),l=(s(128),s(37)),u=s(38),h=s(40),j=s(39),d=(s(129),s(130),s(161)),b=s(166),g=s(155),p=s(156),m=s(6),O=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={myMessageHeight:"32px",otherMessageHeight:"32px"},a.myMessage=n.a.createRef(),a.otherMessage=n.a.createRef(),a}return Object(u.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){null!==e.myMessage.current&&null!==e.myMessage.current.clientHeight&&e.setState({myMessageHeight:e.myMessage.current.clientHeight}),null!==e.otherMessage.current&&null!==e.otherMessage.current.clientHeight&&e.setState({otherMessageHeight:e.otherMessage.current.clientHeight})}),1)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return!0===this.props.myMessage?Object(m.jsx)("div",{className:"message",style:{height:this.state.myMessageHeight},children:Object(m.jsxs)(g.a,{justify:"end",children:[Object(m.jsx)("div",{className:"message-bubble my-message-bubble",ref:this.myMessage,children:this.props.message}),Object(m.jsx)(p.a,{span:1,children:Object(m.jsx)(d.a,{className:"my-avatar",shape:"square",size:32,icon:Object(m.jsx)(b.a,{})})})]})}):Object(m.jsx)("div",{className:"message",style:{height:this.state.otherMessageHeight},children:Object(m.jsxs)(g.a,{children:[Object(m.jsx)(p.a,{span:1,children:Object(m.jsx)(d.a,{shape:"square",size:32,icon:Object(m.jsx)(b.a,{})})}),Object(m.jsx)("div",{className:"message-bubble other-message-bubble",ref:this.otherMessage,children:this.props.message})]})})}}]),s}(n.a.Component),x=(s(134),s(158)),f=s(167),v=s(168),M=s(159),y=s(43),k=M.a.TextArea,C=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).onChange=function(e){a.setState({textValue:e.target.value})},a.processSubmit=function(){var e=new XMLHttpRequest;e.open("post","http://44.233.224.103/admin/ipname/".concat(a.state.userContent)),e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.send("content=".concat(a.state.textValue,"&disable=&bt1")),a.updateBox(a.state.username,"",a.state.userContent),a.setState({textValue:""}),a.props.updateMessageList()},a.state={username:String,userTime:String,userContent:String,textValue:"",messages:[],scripts:[],quickReplies:[]},a.dealer=new WebSocket("ws://44.233.224.103:8765"),a.dealer.onopen=function(e){console.log("WS Opened.")},a}return Object(u.a)(s,[{key:"updateBox",value:function(e,t,s){var a,n=this,c=null===(a=this.state.messages)||void 0===a?void 0:a.length,i=0,r=[],o=[],l=[];fetch("http://44.233.224.103/admin/ipname/"+s+"/get_content",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=0;e.post_raw.forEach((function(e){var s=e.substring(e.lastIndexOf(":")+2,e.length-1);!0===e.includes("user:")?r.push(Object(m.jsx)(O,{message:s,myMessage:!1},"userline".concat(t))):!0===e.includes("us:")&&r.push(Object(m.jsx)(O,{message:s,myMessage:!0},"usline".concat(t))),t++})),e.propose_raw.forEach((function(e){e.startsWith("0,0")?l.push(e):o.push(e)}))})).catch((function(e){console.log("fetch fail")})).then((function(){var t=new Date,a=n.formatTime(t.getHours())+":"+n.formatTime(t.getMinutes());n.setState({username:e,userTime:a,userContent:s,messages:r.reverse(),scripts:o,quickReplies:l}),i=n.state.messages.length,c!==i&&n.scrollToTheBottom()}))}},{key:"formatTime",value:function(e){return(e<10?"0":"")+e}},{key:"scrollToTheBottom",value:function(){var e=document.getElementById("message-area");e.scrollTop=e.scrollHeight}},{key:"render",value:function(){var e=this;return Object(m.jsxs)("div",{className:"chat-box",children:[Object(m.jsxs)(g.a,{className:"user-information",children:[Object(m.jsx)(p.a,{span:6,className:"username-display",children:this.state.username}),Object(m.jsxs)(p.a,{span:18,className:"last-msg-time-display",children:[this.state.username,'"s current time is ',this.state.userTime]})]}),Object(m.jsxs)(g.a,{children:[Object(m.jsxs)(p.a,{span:16,children:[Object(m.jsx)(g.a,{className:"message-area border",id:"message-area",children:Object(m.jsx)(p.a,{span:24,children:this.state.messages})}),Object(m.jsx)(g.a,{className:"tool-bar border",children:Object(m.jsx)(p.a,{span:24,children:Object(m.jsx)(g.a,{children:Object(m.jsxs)(p.a,{span:24,className:"tool-bar",children:[Object(m.jsx)(f.a,{}),Object(m.jsx)(v.a,{})]})})})}),Object(m.jsx)(g.a,{className:"reply-area border",children:Object(m.jsxs)(p.a,{span:24,children:[Object(m.jsx)(k,{showCount:!0,maxLength:200,rows:4,value:this.state.textValue,onChange:this.onChange}),Object(m.jsxs)("div",{className:"buttons",children:[Object(m.jsx)(y.a,{children:"End Chat"}),Object(m.jsx)(y.a,{onClick:this.processSubmit,children:"Send"})]})]})})]}),Object(m.jsxs)(p.a,{span:8,children:[Object(m.jsx)(g.a,{className:"quick-reply",children:Object(m.jsx)(p.a,{span:24,children:Object(m.jsx)(x.b,{header:Object(m.jsx)("div",{children:Object(m.jsx)("b",{children:"Script suggestions"})}),bordered:!0,dataSource:this.state.scripts,renderItem:function(t){return Object(m.jsx)(x.b.Item,{className:"message-item",onClick:function(){e.setState({textValue:t})},children:t},t)}})})}),Object(m.jsx)(g.a,{className:"quick-reply",children:Object(m.jsx)(p.a,{span:24,children:Object(m.jsx)(x.b,{header:Object(m.jsx)("div",{children:Object(m.jsx)("b",{children:"Quick replies"})}),bordered:!0,dataSource:this.state.quickReplies,renderItem:function(t){return Object(m.jsx)(x.b.Item,{className:"message-item",onClick:function(){e.setState({textValue:t})},children:t},t)}})})})]})]})]})}}]),s}(n.a.Component),T=(s(145),s(164)),S=s(162),N=s(165),w=s(163),E=s(160),I=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).onChange=function(e){a.setState({blockIncomingUser:e.target.checked})},a.state={blockIncomingUser:!1,isModelVisible:!1},a}return Object(u.a)(s,[{key:"logout",value:function(){0===this.props.unreadMessageCount?window.open("/logout","_self"):this.setModelVisibility(!0)}},{key:"setModelVisibility",value:function(e){this.setState({isModelVisible:e})}},{key:"handleOk",value:function(){this.setModelVisibility(!1),window.open("/logout","_self")}},{key:"handleCancel",value:function(){this.setModelVisibility(!1)}},{key:"render",value:function(){var e=this,t=Object(m.jsxs)(T.a,{children:[Object(m.jsx)(T.a.Item,{children:Object(m.jsx)(N.a,{onChange:this.onChange,children:"Block incoming users"})},"0"),Object(m.jsx)(T.a.Divider,{}),Object(m.jsx)(T.a.Item,{children:Object(m.jsx)("p",{onClick:function(){return e.logout()},children:"Logout"})},"1")]});return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsxs)(g.a,{align:"",children:[Object(m.jsx)(p.a,{span:4,className:"logo-area",children:"TATA LOGO"}),Object(m.jsx)(p.a,{span:1,offset:19,className:"avatar-area",children:Object(m.jsx)(S.a,{overlay:t,trigger:["click"],children:Object(m.jsx)(w.a,{status:!0===this.state.blockIncomingUser?"warning":"success",children:Object(m.jsx)(d.a,{shape:"square",size:48,icon:Object(m.jsx)(b.a,{})})})})})]}),Object(m.jsxs)(E.a,{title:"Warning",visible:this.state.isModelVisible,onOk:function(){return e.handleOk()},onCancel:function(){return e.handleCancel()},okText:"Yes",children:["You have ",this.props.unreadMessageCount," unread messages from ",this.props.unreadUsersCount,". Logging out will automatically end your chats with all users. Confirm logging out?"]})]})}}]),s}(n.a.Component),H=(s(147),function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(){return Object(l.a)(this,s),t.apply(this,arguments)}return Object(u.a)(s,[{key:"render",value:function(){return Object(m.jsx)("div",{className:"unread-message",onClick:this.props.onClick,style:{backgroundColor:this.props.bgColor},children:Object(m.jsxs)(g.a,{children:[Object(m.jsx)(p.a,{span:2,children:Object(m.jsx)(d.a,{shape:"square",size:32,icon:Object(m.jsx)(b.a,{})})}),Object(m.jsxs)(p.a,{span:18,offset:4,children:[Object(m.jsxs)(g.a,{children:[Object(m.jsx)(p.a,{span:12,children:Object(m.jsx)("span",{children:this.props.username})}),Object(m.jsx)(p.a,{span:7,offset:5,children:Object(m.jsx)("span",{children:this.props.lastMessageTime})})]}),Object(m.jsx)(g.a,{children:Object(m.jsx)(p.a,{span:24,children:Object(m.jsx)("span",{children:this.props.lastMessage})})})]})]})})}}]),s}(n.a.Component)),V=s(157),R=V.a.Sider,B=V.a.Content,q=V.a.Header,L=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(){var e;return Object(l.a)(this,s),(e=t.call(this)).state={unreadMessages:[],unreadMessageElements:[],currentSelected:-1},e.chatBox=n.a.createRef(),e.banner=n.a.createRef(),setInterval((function(){var t;(null===(t=e.banner.current)||void 0===t?void 0:t.state.blockIncomingUser)||e.updateMessageList()}),5e3),e}return Object(u.a)(s,[{key:"componentDidMount",value:function(){this.updateMessageList()}},{key:"onMessageClicked",value:function(e){this.setState({currentSelected:e}),this.changeColor(e),null!==this.chatBox.current&&this.chatBox.current.updateBox(this.state.unreadMessages[e].username,this.state.unreadMessages[e].lastMessageTime,this.state.unreadMessages[e].userContent)}},{key:"changeColor",value:function(e){var t=this,s=this.state.unreadMessageElements;this.setState({unreadMessageElements:[]});for(var a=[],n=function(n){var c=s[n].props.username,i=s[n].props.lastMessageTime,r=s[n].props.lastMessage,o=s[n].props.isRead;n===e?a.push(Object(m.jsx)(H,{username:c,lastMessageTime:i,lastMessage:r,isRead:o,onClick:function(){return t.onMessageClicked(n)},bgColor:"rgb(188, 188, 188)"})):a.push(Object(m.jsx)(H,{username:c,lastMessageTime:i,lastMessage:r,isRead:o,onClick:function(){return t.onMessageClicked(n)},bgColor:"white"}))},c=0;c<s.length;++c)n(c);this.setState({unreadMessageElements:a})}},{key:"updateMessageList",value:function(){var e=this,t=[],s="",a="",n=0,c=0;fetch("http://44.233.224.103/master/raw",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(i){[].push("izuku/123\n"),c=i.content.length,i.content.forEach((function(i){var r="http://44.233.224.103/ipname/"+i.replace("\n","")+"/last_message";fetch(r,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8",Accept:"application/json"}}).then((function(e){return e.json()})).then((function(c){s=i.replace("\n","").split("/")[1],a=i.replace("\n","");var r=1===c.bold,o=c.timestamp.split(":"),l=o[0]+":"+o[1],u=c.last_message,h=u.substring(u.lastIndexOf(":")+1,u.length),j=Object(m.jsx)(H,{username:s.length>12?s.substring(0,12)+"...":s,lastMessageTime:l,lastMessage:(null===h||void 0===h?void 0:h.length)>25?h.substring(0,25)+"...":h,isRead:r,onClick:function(){return e.onMessageClicked(n)},bgColor:"white"},"".concat(s,"_").concat(n));t.push({messageElement:j,username:s,userContent:a,lastMessage:h,lastMessageDate:c.date,lastMessageTime:l,lastMessageDateTime:c.date+" "+l,readStatus:r}),n++})).then((function(){if(n===c){t=t.sort((function(e,t){return e.lastMessageDateTime>t.lastMessageDateTime?-1:e.lastMessageDateTime<t.lastMessageDateTime?1:0}));var s=[];t.forEach((function(e){return s.push(e.messageElement)})),e.setState({unreadMessages:t,unreadMessageElements:s}),e.onMessageClicked(-1===e.state.currentSelected?0:e.state.currentSelected)}}))}))}))}},{key:"render",value:function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(V.a,{children:[Object(m.jsx)(q,{children:Object(m.jsx)(I,{unreadMessageCount:this.state.unreadMessages.length,unreadUsersCount:this.state.unreadMessages.length,ref:this.banner})}),Object(m.jsxs)(V.a,{children:[Object(m.jsx)(R,{children:Object(m.jsxs)("div",{className:"message-list",children:[Object(m.jsx)(g.a,{children:Object(m.jsx)(p.a,{span:23,offset:1,children:Object(m.jsxs)("p",{children:["Unread msgs: ",this.state.unreadMessages.length," from ",this.state.unreadMessages.length," users"]})})}),this.state.unreadMessageElements]})}),Object(m.jsx)(B,{children:Object(m.jsx)(C,{ref:this.chatBox,updateMessageList:this.updateMessageList.bind(this)})})]})]})})}}]),s}(n.a.Component),D=function(e){Object(h.a)(s,e);var t=Object(j.a)(s);function s(){return Object(l.a)(this,s),t.apply(this,arguments)}return Object(u.a)(s,[{key:"render",value:function(){return Object(m.jsx)("div",{className:"logout",children:Object(m.jsx)("p",{children:"You have logged out"})})}}]),s}(n.a.Component);i.a.render(Object(m.jsx)(r.a,{children:Object(m.jsxs)(o.c,{children:[Object(m.jsx)(o.a,{path:"/logout",component:D}),Object(m.jsx)(o.a,{path:"/",component:L})]})}),document.getElementById("root"))}},[[151,1,2]]]);
//# sourceMappingURL=main.7fe15def.chunk.js.map