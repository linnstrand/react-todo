(this["webpackJsonpreact-todo"]=this["webpackJsonpreact-todo"]||[]).push([[0],{32:function(e,t,n){e.exports=n(46)},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var o,a=n(0),r=n.n(a),c=n(19),i=n.n(c),l=n(14),s=n(16),u=n(31),d=n(10),m=function(e){return{type:"ADD_TODO",payload:e}},p={list:[{id:1,name:"Shopping",content:"<ul><li>Chicken</li><li>Yogurt</li><li>Milk</li><li>Potatoes</ul>",hasBullets:!0},{id:2,name:"Book Hair Appointment",content:"<div>Soon!</div>"}],newTodo:{name:"",content:"",id:0}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TODO":return t.payload.id=e.list.reduce((function(e,t){return e>t.id?e:t.id}),0)+1,Object(d.a)({},e,{list:[t.payload].concat(Object(u.a)(e.list)),newTodo:{name:"",content:"",id:0}});case"UPDATE_TODO":var n=e.list.map((function(e){return e.id===t.payload.id?t.payload:e}));return Object(d.a)({},e,{list:n});case"DELETE_TODO":return 0===t.payload?Object(d.a)({},e,{newTodo:{name:"",content:"",id:0}}):Object(d.a)({},e,{list:e.list.filter((function(e){return e.id!==t.payload}))});case"UPDATE_NEW_TODO":return Object(d.a)({},e,{newTodo:t.payload});default:return e}},h=Object(s.b)({todos:f}),b=(n(41),n(42),n(43),n(29)),v=n(15),O=n(2),g=n(3),E=n(5),C=n(4),j=n(6),y=n(21),w=function(e){var t=Object.assign({},e),n=t.content;return n?(n.includes("<li>")?n=(n=n.replace(/(<ul>||<\/ul>)+/g,"")).replace(/li>+/g,"div>"):((n=n.replace(/div>+/g,"li>")).startsWith("<li>")||(n="<li>".concat(n,"</li>")),n="<ul>".concat(n,"</ul>")),t.content=n,t):(t.content="<ul><li></li></ul>",t)},N=[{name:"white",hex:"#fff"},{name:"orange",hex:"#ffeed1"},{name:"pink",hex:"#ffd6e1"},{name:"purple",hex:"#f3d1ff"},{name:"yellow",hex:"#fdffd1"},{name:"green",hex:"#daffd1"},{name:"teal",hex:"#cdf7f3"},{name:"blue",hex:"#d1d8ff"},{name:"grey",hex:"#c7c7c7"}],T=function(e){function t(){return Object(O.a)(this,t),Object(E.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"shadow-sm color-options "+(this.props.visibleColor?"shown":"")},N.map((function(t){var n={borderColor:t.hex,backgroundColor:t.hex};return r.a.createElement("button",{key:t.hex,className:"color-button",title:t.name,style:n,onClick:function(){return e.props.setColor(t.hex)},"aria-label":t.name})})))}}]),t}(r.a.Component),k=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(E.a)(this,Object(C.a)(t).call(this,e))).setColor=function(e){n.props.setColor(e),n.setState({visibleColor:!1})},n.state={visibleColor:!1},n}return Object(j.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-footer"},r.a.createElement("div",{className:"d-inline-flex"},r.a.createElement("button",{type:"button",className:"todo-card-action",onClick:function(){return e.setState({visibleColor:!e.state.visibleColor})}},r.a.createElement("i",{className:"mdi mdi-brush"})),r.a.createElement("button",{type:"button","aria-label":"Bullet Points",onClick:this.props.toggleBullets,className:"todo-card-action bullets-btn"},r.a.createElement("i",{className:"mdi mdi-format-list-bulleted"})),r.a.createElement("button",{type:"button","aria-label":"Delete",onClick:function(){return e.props.deleteTodo()},className:"btn todo-card-action"},r.a.createElement("i",{className:"mdi mdi-delete"})),this.props.isChanged&&r.a.createElement("button",{type:"button","aria-label":"Undo",onClick:function(){return e.props.undo()},className:"todo-card-action"},r.a.createElement("i",{className:"mdi mdi-undo"}))),r.a.createElement("button",{type:"button","aria-label":"Save",onClick:function(){return e.props.close()},className:"btn btn-light close-btn"},"Ok")),r.a.createElement(T,{visibleColor:this.state.visibleColor,setColor:function(t){return e.setColor(t)}}))}}]),t}(a.Component),A=n(17),x=n.n(A),D=function(e){function t(){return Object(O.a)(this,t),Object(E.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,!this.props.name&&r.a.createElement("div",{className:"position-absolute new-todo-text todo-placeholder-title"},"No title set"),r.a.createElement(x.a,{html:this.props.name||"",className:"card-title h5",onChange:function(t){return e.props.onChange(t.target.value)},onFocus:function(){return e.props.setActive(!0)},onBlur:function(){return e.props.setActive(!1)}}))}}]),t}(a.Component),R=function(e){return r.a.createElement(x.a,{html:e.content,innerRef:e.targetRef,className:"card-text",onChange:function(t){return e.onChange(t.target.value)},onFocus:function(){return e.setActive(!0)},onBlur:function(){return e.setActive(!1)}})},B=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(E.a)(this,Object(C.a)(t).call(this,e))).isNew=function(){return 0===n.props.todo.id},n.handleClickOutside=function(e){n.isActive()&&!n.cardRef.current.contains(e.target)&&n.close()},n.isActive=function(){return n.state.contentActive||n.state.titleActive},n.undo=function(){n.props.updateTodo(n.state.originalTodo),n.close()},n.toggleBullets=function(){var e=w(n.props.todo);n.onChange(e)},n.isChanged=function(){return n.props.todo.name!==n.state.originalTodo.name||n.props.todo.content!==n.state.originalTodo.content},n.close=function(){n.setState({titleActive:!1,contentActive:!1})},n.cardRef=r.a.createRef(),n.inputRef=r.a.createRef(),n.handleClickOutside=n.handleClickOutside.bind(Object(y.a)(n)),n.state={originalTodo:Object(d.a)({},n.props.todo),titleActive:!1,contentActive:!1},n}return Object(j.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside);var e=this.inputRef.current;if(this.isNew()&&e){var t=document.createRange(),n=window.getSelection();t.setStart(e,1),t.collapse(!0),n.removeAllRanges(),n.addRange(t),e.focus()}}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"onChange",value:function(e){e.hasBullets=e.content.includes("<li>"),this.props.onChange?this.props.onChange(e):this.props.updateTodo(e)}},{key:"render",value:function(){var e=this,t=this.props.todo;return r.a.createElement("div",{ref:this.cardRef,className:"todo-card card".concat(this.isActive()?" is-editing":"").concat(t.hasBullets?" bullets-active":""),style:{backgroundColor:t.color||"#fff"}},r.a.createElement(D,{name:t.name,onChange:function(n){return e.onChange(Object(d.a)({},t,{name:n}))},setActive:function(t){return e.setState({titleActive:t})}}),r.a.createElement(R,{content:t.content,targetRef:this.inputRef,onChange:function(n){return e.onChange(Object(d.a)({},t,{content:n}))},setActive:function(t){return e.setState({contentActive:t})}}),r.a.createElement(k,{isChanged:this.isChanged()&&!this.isNew(),toggleBullets:function(){return e.toggleBullets()},deleteTodo:function(){return e.props.deleteTodo(t.id)},setColor:function(n){return e.onChange(Object(d.a)({},t,{color:n}))},undo:function(){return e.undo()},close:function(){return e.close()}}))}}]),t}(a.Component),S=Object(l.b)((function(e){return{todos:e.todos.list}}),(function(e){return{addTodo:function(t){return e(m(t))},updateTodo:function(t){return e({type:"UPDATE_TODO",payload:t})},deleteTodo:function(t){return e({type:"DELETE_TODO",payload:t})}}}))(B),_=function(e){function t(e){var n;return Object(O.a)(this,t),(n=Object(E.a)(this,Object(C.a)(t).call(this,e))).handleChange=function(e){var t=Object(d.a)({},n.props.todo);t.content=e.target.value,n.props.onChange(t)},n.toggleBullets=function(){var e=w(n.props.todo);n.props.onChange(e)},n.inputRef=r.a.createRef(),n}return Object(j.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){this.inputRef.current.focus()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"d-flex card todo-card todo-placeholder"},r.a.createElement("div",{className:"new-todo-body"},r.a.createElement("div",{className:"new-todo-text"},!this.props.todo.content&&r.a.createElement("div",{className:"position-absolute new-todo-text todo-placeholder-title"},"Write a note!"),r.a.createElement(x.a,{html:this.props.todo.content||"",innerRef:this.inputRef,className:"new-todo-text new-todo-content",onChange:function(t){return e.handleChange(t)}}))),r.a.createElement("div",{className:"new-todo-menu"},r.a.createElement("button",{type:"button","aria-label":"Bullet Points",onClick:this.toggleBullets,className:"todo-card-action"},r.a.createElement("i",{className:"mdi mdi-format-list-bulleted"}))))}}]),t}(a.Component),P=(o=S,function(e){return e.todo.content?r.a.createElement(o,e):r.a.createElement(_,e)}),W=function(e){function t(){return Object(O.a)(this,t),Object(E.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(P,{todo:this.props.newTodo,onChange:function(t){return e.props.updateNewTodo(t)},done:function(t){return e.props.addTodo(t)}})}}]),t}(a.Component),U=Object(l.b)((function(e){return{newTodo:e.todos.newTodo}}),(function(e){return{addTodo:function(t){return e(m(t))},updateNewTodo:function(t){return e({type:"UPDATE_NEW_TODO",payload:t})}}}))(W),F=function(e){function t(){return Object(O.a)(this,t),Object(E.a)(this,Object(C.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"d-flex new-todo-card"},r.a.createElement(U,null)),this.props.todos.map((function(e){return r.a.createElement("div",{key:e.id,className:"d-inline-flex align-items-start flex-wrap"},r.a.createElement(S,{todo:e}))})))}}]),t}(a.Component),L=Object(l.b)((function(e){return{todos:e.todos.list}}))(F),M=function(){return r.a.createElement(L,null)},J=function(){return r.a.createElement("div",null,"About")},H=function(){return r.a.createElement(b.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("main",{className:"mt-4"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement(v.a,{path:"/",exact:!0,component:M}),r.a.createElement(v.a,{path:"/about",exact:!0,component:J})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var I=Object(s.c)(h);i.a.render(r.a.createElement(l.a,{store:I},r.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[32,1,2]]]);
//# sourceMappingURL=main.1baecfe2.chunk.js.map