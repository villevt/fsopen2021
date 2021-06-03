(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),o=t(6),a=t(4),i=t(2),u=t(3),d=t.n(u),s="/api/persons",l={getAll:function(){return d.a.get(s).then((function(e){return e.data}))},create:function(e){return d.a.post(s,e).then((function(e){return e.data}))},remove:function(e){return d.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},update:function(e){return d.a.put("".concat(s,"/").concat(e.id),e).then((function(e){return e.data}))}},b=t(0),j=function(e){var n=e.handleSubmit;return Object(b.jsxs)("form",{children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{onClick:function(e){e.preventDefault(),""===e.target.form[0].value?alert("Please fill in a name"):""===e.target.form[1].value?alert("Please fill in a number"):n(e)},type:"submit",children:"add"})})]})},f=function(e){var n=e.handleFilter;return Object(b.jsxs)("div",{children:["filter shown with ",Object(b.jsx)("input",{onChange:n})]})},h=function(e){var n=e.message,t=e.error,r={color:"white",marginBottom:"10px",padding:"2px",width:"30%"};return r.backgroundColor=t?"red":"green",n?Object(b.jsx)("div",{style:r,children:n}):null},m=function(e){var n=e.person;return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:n.name}),Object(b.jsx)("td",{children:n.number}),Object(b.jsx)("td",{children:Object(b.jsx)("button",{onClick:n.removeHandler,children:"Remove"})})]})},O=function(e){var n=e.persons;return Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:n.sort((function(e,n){return e.name.toLowerCase()<n.name.toLowerCase()?-1:1})).map((function(e){return Object(b.jsx)(m,{person:e},e.id)}))})})},p=function(){var e=Object(i.useState)([{}]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(i.useState)(""),u=Object(a.a)(c,2),d=u[0],s=u[1],m=Object(i.useState)({notification:null,error:!1}),p=Object(a.a)(m,2),v=p[0],x=p[1],g=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];x({notification:e,error:n}),setTimeout((function(){return x({notification:null,error:!1})}),3e3)},w=function e(n){r(n.map((function(t){return Object(o.a)(Object(o.a)({},t),{},{removeHandler:function(){window.confirm("Delete ".concat(t.name,"?"))&&l.remove(t.id).then((function(r){e(n.filter((function(e){return e.id!==t.id}))),g("Deleted ".concat(t.name))})).catch((function(e){return g("Failed to delete person\n".concat(e),!0)}))}})})))};Object(i.useEffect)((function(){l.getAll().then((function(e){return w(e)})).catch((function(e){return g("Failed to retrieve numbers \n".concat(e),!0)}))}),[]);var k="";return t[0].name&&(k=Object(b.jsx)(O,{persons:t.filter((function(e){return e.name.toLowerCase().startsWith(d)}))})),Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Phonebook"}),Object(b.jsx)(h,{message:v.notification,error:v.error}),Object(b.jsx)(f,{handleFilter:function(e){var n=e.target.value.toLowerCase();s(n)}}),Object(b.jsx)("h2",{children:"Add a new"}),Object(b.jsx)(j,{handleSubmit:function(e){var n=e.target.form[0].value,r=e.target.form[1].value;t.some((function(e){return e.name===n}))?window.confirm("".concat(n," is already in the phonebook. Replace the old number with a new one?"))&&l.update({name:n,number:r,id:t.find((function(e){return e.name===n})).id}).then((function(e){w(t.map((function(e){return e.name===n&&(e.number=r),e}))),g("Updated ".concat(e.name))})).catch((function(e){return g("Error updating number\n".concat(e),!0)})):t.some((function(e){return e.number===r}))?g("".concat(r," is already in phonebook")):l.create({name:n,number:r}).then((function(e){w(t.concat(e)),g("Added ".concat(e.name))})).catch((function(e){return g("Error adding number\n".concat(e),!0)}))}}),Object(b.jsx)("h2",{children:"Numbers"}),k]})};c.a.render(Object(b.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.38e0dec2.chunk.js.map