import{_ as m}from"./app-77617d24.js";import{r as a,q as i,j as t,a as p,y as n}from"./index-99d872a8.js";import{C as c,T as d}from"./ToolBar-b5d94b69.js";import{D as x}from"./DocumentsLayout-57add6c9.js";import"./button-a138ab3f.js";import"./useCoverImageModal-16ff4476.js";import"./index-af82dd34.js";import"./index-a8d5df0b.js";import"./objectWithoutPropertiesLoose-21b69f3c.js";import"./SearchCommand-ca12abf1.js";import"./alert-dialog-f7fb41d0.js";import"./check-f3605966.js";import"./Heading-f55c9586.js";import"./input-13e08f83.js";const l=a.lazy(()=>m(()=>import("./Editor-825de860.js"),["assets/Editor-825de860.js","assets/index-99d872a8.js","assets/createPopper-ea072df4.js","assets/button-a138ab3f.js","assets/index-e8e5dbb3.js","assets/index-a8d5df0b.js","assets/index-af82dd34.js","assets/Editor-182c4183.css"])),N=()=>{const{selected_document:o}=i().props,r=s=>{const{id:e}=o;n.post(route("documents.update",{id:e}),{content:s},{preserveState:!0})};return t.jsxs(t.Fragment,{children:[t.jsx(p,{title:"Documents"}),t.jsx(x,{children:t.jsxs("div",{className:"pb-40",children:[t.jsx(c,{document:o}),t.jsxs("div",{className:"md:max-w-3xl lg:max-w-4xl mx-auto",children:[t.jsx(d,{initialData:o}),t.jsx(l,{document:o,onChange:r})]})]})})]})};export{N as default};
