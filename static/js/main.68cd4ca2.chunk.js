(this["webpackJsonpmy-tree-app"]=this["webpackJsonpmy-tree-app"]||[]).push([[0],{18:function(e,t,n){e.exports=n(33)},23:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),l=n(8),i=n.n(l),r=(n(23),n(1)),s=n(2),d=n(4),c=n(3),u=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.list.map((function(e){return"T"===e.type?a.a.createElement("h3",null,e.text):a.a.createElement("p",null,e.text)}));return a.a.createElement("div",null,e)}}]),n}(o.Component),g=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.props.listOfNodes.map((function(t){return a.a.createElement("li",{className:"col-6 col-md-4",onClick:function(){return e.props.openNode(t.id)}},t.title)}));return a.a.createElement("div",null,a.a.createElement("h5",null,"Children nodes"),a.a.createElement("ul",{className:"row"},t))}}]),n}(o.Component),h=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.node,t=e.title,n=e.body,o=this.props,l=o.childNodes,i=o.openNode;return a.a.createElement("div",null,a.a.createElement("h1",null,t),a.a.createElement(u,{list:n.description}),a.a.createElement("div",null,a.a.createElement(g,{listOfNodes:l,openNode:i})))}}]),n}(o.Component),m=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).handleTitleChange=function(e){o.setState({title:e.target.value})},o.handleBodyChange=function(e){o.setState({body:e.target.value})},o.state={title:"",body:""},o}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("form",null,a.a.createElement("div",null,a.a.createElement("label",null,'"Title"'),a.a.createElement("input",{type:"text",value:this.state.title,onChange:this.handleTitleChange})),a.a.createElement("div",null,a.a.createElement("label",null,'"Body"'),a.a.createElement("textarea",{type:"text",value:this.state.body,onChange:this.handleBodyChange}))),a.a.createElement("button",{onClick:function(){return e.props.handleAddNodeSubmit(e.state)}},"submit "))}}]),n}(o.Component),p=n(6),b=n(7),N=n(9),f=n(5),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoggedIn:!1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_IN":return{emailId:t.payload.emailId,name:t.payload.name,isLoggedIn:!0};case"SIGN_OUT":return{emailId:t.payload.emailId,isLoggedIn:!1};default:return e}},y=Object(f.b)({isLogged:v}),O=n(13),L=n(16),E={key:"root",storage:n.n(L).a},k=Object(O.a)(E,y),j=Object(f.c)(k),I=Object(O.b)(j),S="1084512785168-9no6rgfvkralio08vd4k36fvc5c0gnsp.apps.googleusercontent.com",C=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).state={isLogined:j.getState().isLogged.isLoggedIn,accessToken:j.getState().isLogged.name,store:j},console.log(j.getState()),o.login=o.login.bind(Object(p.a)(o)),o.handleLoginFailure=o.handleLoginFailure.bind(Object(p.a)(o)),o.logout=o.logout.bind(Object(p.a)(o)),o.handleLogoutFailure=o.handleLogoutFailure.bind(Object(p.a)(o)),o}return Object(s.a)(n,[{key:"login",value:function(e){console.log(e),console.log(e.accessToken),e&&this.setState((function(t){return{isLogined:!0,accessToken:e.profileObj.name}})),console.log(this.state.store),j.dispatch({type:"SIGN_IN",payload:{emailId:"gmail2",name:e.profileObj.name}})}},{key:"logout",value:function(e){this.setState((function(e){return{isLogined:!1,accessToken:""}})),this.state.store.dispatch({type:"SIGN_OUT",payload:{emailId:"gmail3"}})}},{key:"handleLoginFailure",value:function(e){alert("Failed to log in")}},{key:"handleLogoutFailure",value:function(e){alert("Failed to log out")}},{key:"render",value:function(){return a.a.createElement("div",null,this.state.isLogined?a.a.createElement(b.GoogleLogout,{clientId:S,buttonText:"Logout",onLogoutSuccess:this.logout,onFailure:this.handleLogoutFailure}):a.a.createElement(b.GoogleLogin,{clientId:S,buttonText:"Login",onSuccess:this.login,onFailure:this.handleLoginFailure,cookiePolicy:"single_host_origin",responseType:"code,token"}),this.state.accessToken?a.a.createElement("h5",null,"Welcome ",this.state.accessToken):null)}}]),n}(o.Component),T=function(e){Object(d.a)(n,e);var t=Object(c.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).fun=j.subscribe((function(){console.log("subscribing"),o.setState({isLoggedIn:j.getState().isLogged.isLoggedIn})})),o.openNode=function(e){if(e<0)o.setState({addNodeOn:!1});else{var t=o.state.allNodes[e].relations[0].children.map((function(e){return{id:e,title:o.state.allNodes[e].title}}));o.setState({currentNodeId:e,parentNode:o.state.allNodes[e].parent,currentNode:o.state.allNodes[e],childNodes:t,addNodeOn:!1})}},o.openParentNode=function(){o.openNode(o.state.parentNode)},o.handleAddNodeSubmit=function(e){var t={id:o.state.allNodes.length,body:{description:[{text:e.title,type:"T"},{text:e.body,type:"P"}]},title:e.title,parent:o.state.currentNodeId,relations:[{children:[]}]},n=o.state.allNodes;n.push(t),n[t.parent].relations[0].children.push(t.id),o.setState({allNodes:n,addNodeOn:!o.state.addNodeOn}),o.openNode(o.state.currentNodeId),console.log(n)},o.toggleAddNodeOn=function(){o.setState({addNodeOn:!o.state.addNodeOn})},o.getLoginButton=function(){var e=function(e){o.setState({isLoggedIn:!0}),console.log(e.getBasicProfile().getEmail())};return!1===o.state.isLoggedIn?a.a.createElement(b.GoogleLogin,{clientId:"1084512785168-9no6rgfvkralio08vd4k36fvc5c0gnsp.apps.googleusercontent.com",buttonText:"Login",onSuccess:e,onFailure:e,cookiePolicy:"single_host_origin"}):a.a.createElement(b.GoogleLogout,{clientId:"658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com",buttonText:"Logout",onLogoutSuccess:function(e){console.log(e)}})},o.state={isLoaded:!1,allNodes:[],currentNodeId:0,currentNode:{},childNodes:[],parentNode:-1,addNodeOn:!1,isLoggedIn:j.getState().isLogged.isLoggedIn,store:j},o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("https://api.npoint.io/1800ee5d52be1bdea4d6/").then((function(e){return e.json()})).then((function(t){var n=t[e.state.currentNodeId].relations[0].children.map((function(e){return{id:e,title:t[e].title}}));e.setState({isLoaded:!0,allNodes:t,currentNode:t[e.state.currentNodeId],childNodes:n})}))}},{key:"getAddNodeComponent",value:function(){if(this.state.addNodeOn)return a.a.createElement(m,{handleAddNodeSubmit:this.handleAddNodeSubmit})}},{key:"render",value:function(){var e=this.state,t=e.currentNode,n=e.isLoaded,o=e.isLoggedIn;return console.log(o),console.log(this.state.store.getState()),n?a.a.createElement("div",{className:"App",style:{margin:"5%"}},a.a.createElement(C,{store:this.state.store}),o&&a.a.createElement("div",null,a.a.createElement("button",{className:"btn btn-primary m-2",onClick:this.openParentNode},"<< parent "),a.a.createElement("div",null,a.a.createElement(h,{node:t,childNodes:this.state.childNodes,openNode:this.openNode,addNewNode:this.addNewNode})),a.a.createElement("button",{className:"btn btn-primary m-2",onClick:this.toggleAddNodeOn},"Add New Node"),this.getAddNodeComponent())):a.a.createElement("div",{className:"App"},a.a.createElement("h1",null," Loading..."))}}]),n}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(32);var w=n(17);console.log(j.getState().isLogged.isLoggedIn),i.a.render(a.a.createElement(N.a,{store:j},a.a.createElement(w.a,{loading:a.a.createElement("h1",null,"loading.."),persistor:I},a.a.createElement(T,{store:j}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.68cd4ca2.chunk.js.map