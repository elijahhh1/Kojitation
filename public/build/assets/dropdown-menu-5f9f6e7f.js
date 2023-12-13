import{c as Gt,$ as Se,h as Fe,a as ke,b as Le,d as je,e as Ge,f as Y,X as Kt,g as Ke,i as Ut,j as zt,k as Vt}from"./index-e7e3790e.js";import{r as t,j as x,f as O}from"./index-2a4703ec.js";import{_ as i,d as ae,$ as I,b as M,c as h,e as Bt,f as Ue,g as ze,h as Yt}from"./button-77adb7fd.js";import{c as Ve,$ as H,d as U,b as v,f as Xt,a as xe,g as Be}from"./index-b5cb4413.js";import{a as Ht}from"./checkbox-6185c8ae.js";const Wt=Ve("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),qt=Ve("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),Oc=Gt(e=>({onOpen:()=>e({isOpen:!0}),onClose:()=>e({isOpen:!1})})),Ye="Dialog",[Xe,He]=H(Ye),[Zt,T]=Xe(Ye),Jt=e=>{const{__scopeDialog:n,children:o,open:c,defaultOpen:r,onOpenChange:a,modal:s=!0}=e,d=t.useRef(null),u=t.useRef(null),[f=!1,p]=xe({prop:c,defaultProp:r,onChange:a});return t.createElement(Zt,{scope:n,triggerRef:d,contentRef:u,contentId:Y(),titleId:Y(),descriptionId:Y(),open:f,onOpenChange:p,onOpenToggle:t.useCallback(()=>p(l=>!l),[p]),modal:s},o)},Qt="DialogTrigger",eo=t.forwardRef((e,n)=>{const{__scopeDialog:o,...c}=e,r=T(Qt,o),a=M(n,r.triggerRef);return t.createElement(I.button,i({type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":ve(r.open)},c,{ref:a,onClick:v(e.onClick,r.onOpenToggle)}))}),We="DialogPortal",[to,qe]=Xe(We,{forceMount:void 0}),oo=e=>{const{__scopeDialog:n,forceMount:o,children:c,container:r}=e,a=T(We,n);return t.createElement(to,{scope:n,forceMount:o},t.Children.map(c,s=>t.createElement(U,{present:o||a.open},t.createElement(Ge,{asChild:!0,container:r},s))))},$e="DialogOverlay",no=t.forwardRef((e,n)=>{const o=qe($e,e.__scopeDialog),{forceMount:c=o.forceMount,...r}=e,a=T($e,e.__scopeDialog);return a.modal?t.createElement(U,{present:c||a.open},t.createElement(co,i({},r,{ref:n}))):null}),co=t.forwardRef((e,n)=>{const{__scopeDialog:o,...c}=e,r=T($e,o);return t.createElement(Se,{as:ae,allowPinchZoom:!0,shards:[r.contentRef]},t.createElement(I.div,i({"data-state":ve(r.open)},c,{ref:n,style:{pointerEvents:"auto",...c.style}})))}),X="DialogContent",ro=t.forwardRef((e,n)=>{const o=qe(X,e.__scopeDialog),{forceMount:c=o.forceMount,...r}=e,a=T(X,e.__scopeDialog);return t.createElement(U,{present:c||a.open},a.modal?t.createElement(ao,i({},r,{ref:n})):t.createElement(so,i({},r,{ref:n})))}),ao=t.forwardRef((e,n)=>{const o=T(X,e.__scopeDialog),c=t.useRef(null),r=M(n,o.contentRef,c);return t.useEffect(()=>{const a=c.current;if(a)return Fe(a)},[]),t.createElement(Ze,i({},e,{ref:r,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(e.onCloseAutoFocus,a=>{var s;a.preventDefault(),(s=o.triggerRef.current)===null||s===void 0||s.focus()}),onPointerDownOutside:v(e.onPointerDownOutside,a=>{const s=a.detail.originalEvent,d=s.button===0&&s.ctrlKey===!0;(s.button===2||d)&&a.preventDefault()}),onFocusOutside:v(e.onFocusOutside,a=>a.preventDefault())}))}),so=t.forwardRef((e,n)=>{const o=T(X,e.__scopeDialog),c=t.useRef(!1),r=t.useRef(!1);return t.createElement(Ze,i({},e,{ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{var s;if((s=e.onCloseAutoFocus)===null||s===void 0||s.call(e,a),!a.defaultPrevented){var d;c.current||(d=o.triggerRef.current)===null||d===void 0||d.focus(),a.preventDefault()}c.current=!1,r.current=!1},onInteractOutside:a=>{var s,d;(s=e.onInteractOutside)===null||s===void 0||s.call(e,a),a.defaultPrevented||(c.current=!0,a.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const u=a.target;((d=o.triggerRef.current)===null||d===void 0?void 0:d.contains(u))&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&r.current&&a.preventDefault()}}))}),Ze=t.forwardRef((e,n)=>{const{__scopeDialog:o,trapFocus:c,onOpenAutoFocus:r,onCloseAutoFocus:a,...s}=e,d=T(X,o),u=t.useRef(null),f=M(n,u);return ke(),t.createElement(t.Fragment,null,t.createElement(Le,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:r,onUnmountAutoFocus:a},t.createElement(je,i({role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":ve(d.open)},s,{ref:f,onDismiss:()=>d.onOpenChange(!1)}))),!1)}),Je="DialogTitle",lo=t.forwardRef((e,n)=>{const{__scopeDialog:o,...c}=e,r=T(Je,o);return t.createElement(I.h2,i({id:r.titleId},c,{ref:n}))}),io="DialogDescription",uo=t.forwardRef((e,n)=>{const{__scopeDialog:o,...c}=e,r=T(io,o);return t.createElement(I.p,i({id:r.descriptionId},c,{ref:n}))}),fo="DialogClose",po=t.forwardRef((e,n)=>{const{__scopeDialog:o,...c}=e,r=T(fo,o);return t.createElement(I.button,i({type:"button"},c,{ref:n,onClick:v(e.onClick,()=>r.onOpenChange(!1))}))});function ve(e){return e?"open":"closed"}const $o="DialogTitleWarning",[mo,Sc]=Xt($o,{contentName:X,titleName:Je,docsSlug:"dialog"}),Qe=Jt,et=eo,tt=oo,_e=no,we=ro,Ee=lo,he=uo,Ce=po,Fc=Qe,kc=et,bo=tt,ot=t.forwardRef(({className:e,...n},o)=>x.jsx(_e,{ref:o,className:h("fixed inset-0 z-[111111] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...n}));ot.displayName=_e.displayName;const go=t.forwardRef(({className:e,children:n,...o},c)=>x.jsxs(bo,{children:[x.jsx(ot,{}),x.jsxs(we,{ref:c,className:h("fixed left-[50%] top-[50%] z-[111111] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",e),...o,children:[n,x.jsxs(Ce,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[x.jsx(Kt,{className:"h-4 w-4"}),x.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));go.displayName=we.displayName;const xo=({className:e,...n})=>x.jsx("div",{className:h("flex flex-col space-y-1.5 text-center sm:text-left",e),...n});xo.displayName="DialogHeader";const vo=({className:e,...n})=>x.jsx("div",{className:h("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...n});vo.displayName="DialogFooter";const _o=t.forwardRef(({className:e,...n},o)=>x.jsx(Ee,{ref:o,className:h("text-lg font-semibold leading-none tracking-tight",e),...n}));_o.displayName=Ee.displayName;const wo=t.forwardRef(({className:e,...n},o)=>x.jsx(he,{ref:o,className:h("text-sm text-muted-foreground",e),...n}));wo.displayName=he.displayName;const Eo="AlertDialog",[ho,Lc]=H(Eo,[He]),L=He(),Co=e=>{const{__scopeAlertDialog:n,...o}=e,c=L(n);return t.createElement(Qe,i({},c,o,{modal:!0}))},Do=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,r=L(o);return t.createElement(et,i({},r,c,{ref:n}))}),Ro=e=>{const{__scopeAlertDialog:n,...o}=e,c=L(n);return t.createElement(tt,i({},c,o))},Mo=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,r=L(o);return t.createElement(_e,i({},r,c,{ref:n}))}),nt="AlertDialogContent",[Io,yo]=ho(nt),Po=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,children:c,...r}=e,a=L(o),s=t.useRef(null),d=M(n,s),u=t.useRef(null);return t.createElement(mo,{contentName:nt,titleName:Ao,docsSlug:"alert-dialog"},t.createElement(Io,{scope:o,cancelRef:u},t.createElement(we,i({role:"alertdialog"},a,r,{ref:d,onOpenAutoFocus:v(r.onOpenAutoFocus,f=>{var p;f.preventDefault(),(p=u.current)===null||p===void 0||p.focus({preventScroll:!0})}),onPointerDownOutside:f=>f.preventDefault(),onInteractOutside:f=>f.preventDefault()}),t.createElement(Bt,null,c),!1)))}),Ao="AlertDialogTitle",No=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,r=L(o);return t.createElement(Ee,i({},r,c,{ref:n}))}),To=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,r=L(o);return t.createElement(he,i({},r,c,{ref:n}))}),Oo=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,r=L(o);return t.createElement(Ce,i({},r,c,{ref:n}))}),So="AlertDialogCancel",Fo=t.forwardRef((e,n)=>{const{__scopeAlertDialog:o,...c}=e,{cancelRef:r}=yo(So,o),a=L(o),s=M(n,r);return t.createElement(Ce,i({},a,c,{ref:s}))}),ko=Co,Lo=Do,jo=Ro,ct=Mo,rt=Po,at=Oo,st=Fo,dt=No,lt=To,jc=ko,Gc=Lo,Go=jo,it=t.forwardRef(({className:e,children:n,...o},c)=>x.jsx(ct,{className:h("fixed inset-0 z-[111111] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...o,ref:c}));it.displayName=ct.displayName;const Ko=t.forwardRef(({className:e,...n},o)=>x.jsxs(Go,{children:[x.jsx(it,{}),x.jsx(rt,{ref:o,className:h("fixed left-[50%] top-[50%] z-[111111] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",e),...n})]}));Ko.displayName=rt.displayName;const Uo=({className:e,...n})=>x.jsx("div",{className:h("flex flex-col space-y-2 text-center sm:text-left",e),...n});Uo.displayName="AlertDialogHeader";const zo=({className:e,...n})=>x.jsx("div",{className:h("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...n});zo.displayName="AlertDialogFooter";const Vo=t.forwardRef(({className:e,...n},o)=>x.jsx(dt,{ref:o,className:h("text-lg font-semibold",e),...n}));Vo.displayName=dt.displayName;const Bo=t.forwardRef(({className:e,...n},o)=>x.jsx(lt,{ref:o,className:h("text-sm text-muted-foreground",e),...n}));Bo.displayName=lt.displayName;const Yo=t.forwardRef(({className:e,...n},o)=>x.jsx(at,{ref:o,className:h(Ue(),e),...n}));Yo.displayName=at.displayName;const Xo=t.forwardRef(({className:e,...n},o)=>x.jsx(st,{ref:o,className:h(Ue({variant:"outline"}),"mt-2 sm:mt-0",e),...n}));Xo.displayName=st.displayName;function ut(e){const n=e+"CollectionProvider",[o,c]=H(n),[r,a]=o(n,{collectionRef:{current:null},itemMap:new Map}),s=g=>{const{scope:$,children:_}=g,C=O.useRef(null),w=O.useRef(new Map).current;return O.createElement(r,{scope:$,itemMap:w,collectionRef:C},_)},d=e+"CollectionSlot",u=O.forwardRef((g,$)=>{const{scope:_,children:C}=g,w=a(d,_),E=M($,w.collectionRef);return O.createElement(ae,{ref:E},C)}),f=e+"CollectionItemSlot",p="data-radix-collection-item",l=O.forwardRef((g,$)=>{const{scope:_,children:C,...w}=g,E=O.useRef(null),S=M($,E),P=a(f,_);return O.useEffect(()=>(P.itemMap.set(E,{ref:E,...w}),()=>void P.itemMap.delete(E))),O.createElement(ae,{[p]:"",ref:S},C)});function b(g){const $=a(e+"CollectionConsumer",g);return O.useCallback(()=>{const C=$.collectionRef.current;if(!C)return[];const w=Array.from(C.querySelectorAll(`[${p}]`));return Array.from($.itemMap.values()).sort((P,W)=>w.indexOf(P.ref.current)-w.indexOf(W.ref.current))},[$.collectionRef,$.itemMap])}return[{Provider:s,Slot:u,ItemSlot:l},b,c]}const Ho=t.createContext(void 0);function ft(e){const n=t.useContext(Ho);return e||n||"ltr"}const pe="rovingFocusGroup.onEntryFocus",Wo={bubbles:!1,cancelable:!0},De="RovingFocusGroup",[me,pt,qo]=ut(De),[Zo,$t]=H(De,[qo]),[Jo,Qo]=Zo(De),en=t.forwardRef((e,n)=>t.createElement(me.Provider,{scope:e.__scopeRovingFocusGroup},t.createElement(me.Slot,{scope:e.__scopeRovingFocusGroup},t.createElement(tn,i({},e,{ref:n}))))),tn=t.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:o,orientation:c,loop:r=!1,dir:a,currentTabStopId:s,defaultCurrentTabStopId:d,onCurrentTabStopIdChange:u,onEntryFocus:f,...p}=e,l=t.useRef(null),b=M(n,l),g=ft(a),[$=null,_]=xe({prop:s,defaultProp:d,onChange:u}),[C,w]=t.useState(!1),E=Be(f),S=pt(o),P=t.useRef(!1),[W,q]=t.useState(0);return t.useEffect(()=>{const D=l.current;if(D)return D.addEventListener(pe,E),()=>D.removeEventListener(pe,E)},[E]),t.createElement(Jo,{scope:o,orientation:c,dir:g,loop:r,currentTabStopId:$,onItemFocus:t.useCallback(D=>_(D),[_]),onItemShiftTab:t.useCallback(()=>w(!0),[]),onFocusableItemAdd:t.useCallback(()=>q(D=>D+1),[]),onFocusableItemRemove:t.useCallback(()=>q(D=>D-1),[])},t.createElement(I.div,i({tabIndex:C||W===0?-1:0,"data-orientation":c},p,{ref:b,style:{outline:"none",...e.style},onMouseDown:v(e.onMouseDown,()=>{P.current=!0}),onFocus:v(e.onFocus,D=>{const le=!P.current;if(D.target===D.currentTarget&&le&&!C){const G=new CustomEvent(pe,Wo);if(D.currentTarget.dispatchEvent(G),!G.defaultPrevented){const j=S().filter(F=>F.focusable),ie=j.find(F=>F.active),Z=j.find(F=>F.id===$),J=[ie,Z,...j].filter(Boolean).map(F=>F.ref.current);mt(J)}}P.current=!1}),onBlur:v(e.onBlur,()=>w(!1))})))}),on="RovingFocusGroupItem",nn=t.forwardRef((e,n)=>{const{__scopeRovingFocusGroup:o,focusable:c=!0,active:r=!1,tabStopId:a,...s}=e,d=Y(),u=a||d,f=Qo(on,o),p=f.currentTabStopId===u,l=pt(o),{onFocusableItemAdd:b,onFocusableItemRemove:g}=f;return t.useEffect(()=>{if(c)return b(),()=>g()},[c,b,g]),t.createElement(me.ItemSlot,{scope:o,id:u,focusable:c,active:r},t.createElement(I.span,i({tabIndex:p?0:-1,"data-orientation":f.orientation},s,{ref:n,onMouseDown:v(e.onMouseDown,$=>{c?f.onItemFocus(u):$.preventDefault()}),onFocus:v(e.onFocus,()=>f.onItemFocus(u)),onKeyDown:v(e.onKeyDown,$=>{if($.key==="Tab"&&$.shiftKey){f.onItemShiftTab();return}if($.target!==$.currentTarget)return;const _=an($,f.orientation,f.dir);if(_!==void 0){$.preventDefault();let w=l().filter(E=>E.focusable).map(E=>E.ref.current);if(_==="last")w.reverse();else if(_==="prev"||_==="next"){_==="prev"&&w.reverse();const E=w.indexOf($.currentTarget);w=f.loop?sn(w,E+1):w.slice(E+1)}setTimeout(()=>mt(w))}})})))}),cn={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function rn(e,n){return n!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function an(e,n,o){const c=rn(e.key,o);if(!(n==="vertical"&&["ArrowLeft","ArrowRight"].includes(c))&&!(n==="horizontal"&&["ArrowUp","ArrowDown"].includes(c)))return cn[c]}function mt(e){const n=document.activeElement;for(const o of e)if(o===n||(o.focus(),document.activeElement!==n))return}function sn(e,n){return e.map((o,c)=>e[(n+c)%e.length])}const dn=en,ln=nn,be=["Enter"," "],un=["ArrowDown","PageUp","Home"],bt=["ArrowUp","PageDown","End"],fn=[...un,...bt],pn={ltr:[...be,"ArrowRight"],rtl:[...be,"ArrowLeft"]},$n={ltr:["ArrowLeft"],rtl:["ArrowRight"]},de="Menu",[te,mn,bn]=ut(de),[z,gt]=H(de,[bn,Ke,$t]),Re=Ke(),xt=$t(),[gn,V]=z(de),[xn,ne]=z(de),vn=e=>{const{__scopeMenu:n,open:o=!1,children:c,dir:r,onOpenChange:a,modal:s=!0}=e,d=Re(n),[u,f]=t.useState(null),p=t.useRef(!1),l=Be(a),b=ft(r);return t.useEffect(()=>{const g=()=>{p.current=!0,document.addEventListener("pointerdown",$,{capture:!0,once:!0}),document.addEventListener("pointermove",$,{capture:!0,once:!0})},$=()=>p.current=!1;return document.addEventListener("keydown",g,{capture:!0}),()=>{document.removeEventListener("keydown",g,{capture:!0}),document.removeEventListener("pointerdown",$,{capture:!0}),document.removeEventListener("pointermove",$,{capture:!0})}},[]),t.createElement(Vt,d,t.createElement(gn,{scope:n,open:o,onOpenChange:l,content:u,onContentChange:f},t.createElement(xn,{scope:n,onClose:t.useCallback(()=>l(!1),[l]),isUsingKeyboardRef:p,dir:b,modal:s},c)))},vt=t.forwardRef((e,n)=>{const{__scopeMenu:o,...c}=e,r=Re(o);return t.createElement(zt,i({},r,c,{ref:n}))}),_t="MenuPortal",[_n,wt]=z(_t,{forceMount:void 0}),wn=e=>{const{__scopeMenu:n,forceMount:o,children:c,container:r}=e,a=V(_t,n);return t.createElement(_n,{scope:n,forceMount:o},t.createElement(U,{present:o||a.open},t.createElement(Ge,{asChild:!0,container:r},c)))},N="MenuContent",[En,Me]=z(N),hn=t.forwardRef((e,n)=>{const o=wt(N,e.__scopeMenu),{forceMount:c=o.forceMount,...r}=e,a=V(N,e.__scopeMenu),s=ne(N,e.__scopeMenu);return t.createElement(te.Provider,{scope:e.__scopeMenu},t.createElement(U,{present:c||a.open},t.createElement(te.Slot,{scope:e.__scopeMenu},s.modal?t.createElement(Cn,i({},r,{ref:n})):t.createElement(Dn,i({},r,{ref:n})))))}),Cn=t.forwardRef((e,n)=>{const o=V(N,e.__scopeMenu),c=t.useRef(null),r=M(n,c);return t.useEffect(()=>{const a=c.current;if(a)return Fe(a)},[]),t.createElement(Ie,i({},e,{ref:r,trapFocus:o.open,disableOutsidePointerEvents:o.open,disableOutsideScroll:!0,onFocusOutside:v(e.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>o.onOpenChange(!1)}))}),Dn=t.forwardRef((e,n)=>{const o=V(N,e.__scopeMenu);return t.createElement(Ie,i({},e,{ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>o.onOpenChange(!1)}))}),Ie=t.forwardRef((e,n)=>{const{__scopeMenu:o,loop:c=!1,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:s,disableOutsidePointerEvents:d,onEntryFocus:u,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:l,onInteractOutside:b,onDismiss:g,disableOutsideScroll:$,..._}=e,C=V(N,o),w=ne(N,o),E=Re(o),S=xt(o),P=mn(o),[W,q]=t.useState(null),D=t.useRef(null),le=M(n,D,C.onContentChange),G=t.useRef(0),j=t.useRef(""),ie=t.useRef(0),Z=t.useRef(null),ue=t.useRef("right"),J=t.useRef(0),F=$?Se:t.Fragment,Lt=$?{as:ae,allowPinchZoom:!0}:void 0,jt=m=>{var R,A;const K=j.current+m,Q=P().filter(k=>!k.disabled),fe=document.activeElement,Ae=(R=Q.find(k=>k.ref.current===fe))===null||R===void 0?void 0:R.textValue,ce=Q.map(k=>k.textValue),ee=Kn(ce,K,Ae),Ne=(A=Q.find(k=>k.textValue===ee))===null||A===void 0?void 0:A.ref.current;(function k(Te){j.current=Te,window.clearTimeout(G.current),Te!==""&&(G.current=window.setTimeout(()=>k(""),1e3))})(K),Ne&&setTimeout(()=>Ne.focus())};t.useEffect(()=>()=>window.clearTimeout(G.current),[]),ke();const B=t.useCallback(m=>{var R,A;return ue.current===((R=Z.current)===null||R===void 0?void 0:R.side)&&zn(m,(A=Z.current)===null||A===void 0?void 0:A.area)},[]);return t.createElement(En,{scope:o,searchRef:j,onItemEnter:t.useCallback(m=>{B(m)&&m.preventDefault()},[B]),onItemLeave:t.useCallback(m=>{var R;B(m)||((R=D.current)===null||R===void 0||R.focus(),q(null))},[B]),onTriggerLeave:t.useCallback(m=>{B(m)&&m.preventDefault()},[B]),pointerGraceTimerRef:ie,onPointerGraceIntentChange:t.useCallback(m=>{Z.current=m},[])},t.createElement(F,Lt,t.createElement(Le,{asChild:!0,trapped:r,onMountAutoFocus:v(a,m=>{var R;m.preventDefault(),(R=D.current)===null||R===void 0||R.focus()}),onUnmountAutoFocus:s},t.createElement(je,{asChild:!0,disableOutsidePointerEvents:d,onEscapeKeyDown:f,onPointerDownOutside:p,onFocusOutside:l,onInteractOutside:b,onDismiss:g},t.createElement(dn,i({asChild:!0},S,{dir:w.dir,orientation:"vertical",loop:c,currentTabStopId:W,onCurrentTabStopIdChange:q,onEntryFocus:v(u,m=>{w.isUsingKeyboardRef.current||m.preventDefault()})}),t.createElement(Ut,i({role:"menu","aria-orientation":"vertical","data-state":Rt(C.open),"data-radix-menu-content":"",dir:w.dir},E,_,{ref:le,style:{outline:"none",..._.style},onKeyDown:v(_.onKeyDown,m=>{const A=m.target.closest("[data-radix-menu-content]")===m.currentTarget,K=m.ctrlKey||m.altKey||m.metaKey,Q=m.key.length===1;A&&(m.key==="Tab"&&m.preventDefault(),!K&&Q&&jt(m.key));const fe=D.current;if(m.target!==fe||!fn.includes(m.key))return;m.preventDefault();const ce=P().filter(ee=>!ee.disabled).map(ee=>ee.ref.current);bt.includes(m.key)&&ce.reverse(),jn(ce)}),onBlur:v(e.onBlur,m=>{m.currentTarget.contains(m.target)||(window.clearTimeout(G.current),j.current="")}),onPointerMove:v(e.onPointerMove,oe(m=>{const R=m.target,A=J.current!==m.clientX;if(m.currentTarget.contains(R)&&A){const K=m.clientX>J.current?"right":"left";ue.current=K,J.current=m.clientX}}))})))))))}),Rn=t.forwardRef((e,n)=>{const{__scopeMenu:o,...c}=e;return t.createElement(I.div,i({},c,{ref:n}))}),ge="MenuItem",Oe="menu.itemSelect",ye=t.forwardRef((e,n)=>{const{disabled:o=!1,onSelect:c,...r}=e,a=t.useRef(null),s=ne(ge,e.__scopeMenu),d=Me(ge,e.__scopeMenu),u=M(n,a),f=t.useRef(!1),p=()=>{const l=a.current;if(!o&&l){const b=new CustomEvent(Oe,{bubbles:!0,cancelable:!0});l.addEventListener(Oe,g=>c==null?void 0:c(g),{once:!0}),Yt(l,b),b.defaultPrevented?f.current=!1:s.onClose()}};return t.createElement(Et,i({},r,{ref:u,disabled:o,onClick:v(e.onClick,p),onPointerDown:l=>{var b;(b=e.onPointerDown)===null||b===void 0||b.call(e,l),f.current=!0},onPointerUp:v(e.onPointerUp,l=>{var b;f.current||(b=l.currentTarget)===null||b===void 0||b.click()}),onKeyDown:v(e.onKeyDown,l=>{const b=d.searchRef.current!=="";o||b&&l.key===" "||be.includes(l.key)&&(l.currentTarget.click(),l.preventDefault())})}))}),Et=t.forwardRef((e,n)=>{const{__scopeMenu:o,disabled:c=!1,textValue:r,...a}=e,s=Me(ge,o),d=xt(o),u=t.useRef(null),f=M(n,u),[p,l]=t.useState(!1),[b,g]=t.useState("");return t.useEffect(()=>{const $=u.current;if($){var _;g(((_=$.textContent)!==null&&_!==void 0?_:"").trim())}},[a.children]),t.createElement(te.ItemSlot,{scope:o,disabled:c,textValue:r??b},t.createElement(ln,i({asChild:!0},d,{focusable:!c}),t.createElement(I.div,i({role:"menuitem","data-highlighted":p?"":void 0,"aria-disabled":c||void 0,"data-disabled":c?"":void 0},a,{ref:f,onPointerMove:v(e.onPointerMove,oe($=>{c?s.onItemLeave($):(s.onItemEnter($),$.defaultPrevented||$.currentTarget.focus())})),onPointerLeave:v(e.onPointerLeave,oe($=>s.onItemLeave($))),onFocus:v(e.onFocus,()=>l(!0)),onBlur:v(e.onBlur,()=>l(!1))}))))}),Mn=t.forwardRef((e,n)=>{const{checked:o=!1,onCheckedChange:c,...r}=e;return t.createElement(Ct,{scope:e.__scopeMenu,checked:o},t.createElement(ye,i({role:"menuitemcheckbox","aria-checked":se(o)?"mixed":o},r,{ref:n,"data-state":Pe(o),onSelect:v(r.onSelect,()=>c==null?void 0:c(se(o)?!0:!o),{checkForDefaultPrevented:!1})})))}),In="MenuRadioGroup",[Kc,yn]=z(In,{value:void 0,onValueChange:()=>{}}),Pn="MenuRadioItem",An=t.forwardRef((e,n)=>{const{value:o,...c}=e,r=yn(Pn,e.__scopeMenu),a=o===r.value;return t.createElement(Ct,{scope:e.__scopeMenu,checked:a},t.createElement(ye,i({role:"menuitemradio","aria-checked":a},c,{ref:n,"data-state":Pe(a),onSelect:v(c.onSelect,()=>{var s;return(s=r.onValueChange)===null||s===void 0?void 0:s.call(r,o)},{checkForDefaultPrevented:!1})})))}),ht="MenuItemIndicator",[Ct,Nn]=z(ht,{checked:!1}),Tn=t.forwardRef((e,n)=>{const{__scopeMenu:o,forceMount:c,...r}=e,a=Nn(ht,o);return t.createElement(U,{present:c||se(a.checked)||a.checked===!0},t.createElement(I.span,i({},r,{ref:n,"data-state":Pe(a.checked)})))}),On=t.forwardRef((e,n)=>{const{__scopeMenu:o,...c}=e;return t.createElement(I.div,i({role:"separator","aria-orientation":"horizontal"},c,{ref:n}))}),Sn="MenuSub",[Uc,Dt]=z(Sn),re="MenuSubTrigger",Fn=t.forwardRef((e,n)=>{const o=V(re,e.__scopeMenu),c=ne(re,e.__scopeMenu),r=Dt(re,e.__scopeMenu),a=Me(re,e.__scopeMenu),s=t.useRef(null),{pointerGraceTimerRef:d,onPointerGraceIntentChange:u}=a,f={__scopeMenu:e.__scopeMenu},p=t.useCallback(()=>{s.current&&window.clearTimeout(s.current),s.current=null},[]);return t.useEffect(()=>p,[p]),t.useEffect(()=>{const l=d.current;return()=>{window.clearTimeout(l),u(null)}},[d,u]),t.createElement(vt,i({asChild:!0},f),t.createElement(Et,i({id:r.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":r.contentId,"data-state":Rt(o.open)},e,{ref:ze(n,r.onTriggerChange),onClick:l=>{var b;(b=e.onClick)===null||b===void 0||b.call(e,l),!(e.disabled||l.defaultPrevented)&&(l.currentTarget.focus(),o.open||o.onOpenChange(!0))},onPointerMove:v(e.onPointerMove,oe(l=>{a.onItemEnter(l),!l.defaultPrevented&&!e.disabled&&!o.open&&!s.current&&(a.onPointerGraceIntentChange(null),s.current=window.setTimeout(()=>{o.onOpenChange(!0),p()},100))})),onPointerLeave:v(e.onPointerLeave,oe(l=>{var b;p();const g=(b=o.content)===null||b===void 0?void 0:b.getBoundingClientRect();if(g){var $;const _=($=o.content)===null||$===void 0?void 0:$.dataset.side,C=_==="right",w=C?-5:5,E=g[C?"left":"right"],S=g[C?"right":"left"];a.onPointerGraceIntentChange({area:[{x:l.clientX+w,y:l.clientY},{x:E,y:g.top},{x:S,y:g.top},{x:S,y:g.bottom},{x:E,y:g.bottom}],side:_}),window.clearTimeout(d.current),d.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(l),l.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:v(e.onKeyDown,l=>{const b=a.searchRef.current!=="";if(!(e.disabled||b&&l.key===" ")&&pn[c.dir].includes(l.key)){var g;o.onOpenChange(!0),(g=o.content)===null||g===void 0||g.focus(),l.preventDefault()}})})))}),kn="MenuSubContent",Ln=t.forwardRef((e,n)=>{const o=wt(N,e.__scopeMenu),{forceMount:c=o.forceMount,...r}=e,a=V(N,e.__scopeMenu),s=ne(N,e.__scopeMenu),d=Dt(kn,e.__scopeMenu),u=t.useRef(null),f=M(n,u);return t.createElement(te.Provider,{scope:e.__scopeMenu},t.createElement(U,{present:c||a.open},t.createElement(te.Slot,{scope:e.__scopeMenu},t.createElement(Ie,i({id:d.contentId,"aria-labelledby":d.triggerId},r,{ref:f,align:"start",side:s.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:p=>{var l;s.isUsingKeyboardRef.current&&((l=u.current)===null||l===void 0||l.focus()),p.preventDefault()},onCloseAutoFocus:p=>p.preventDefault(),onFocusOutside:v(e.onFocusOutside,p=>{p.target!==d.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:v(e.onEscapeKeyDown,p=>{s.onClose(),p.preventDefault()}),onKeyDown:v(e.onKeyDown,p=>{const l=p.currentTarget.contains(p.target),b=$n[s.dir].includes(p.key);if(l&&b){var g;a.onOpenChange(!1),(g=d.trigger)===null||g===void 0||g.focus(),p.preventDefault()}})})))))});function Rt(e){return e?"open":"closed"}function se(e){return e==="indeterminate"}function Pe(e){return se(e)?"indeterminate":e?"checked":"unchecked"}function jn(e){const n=document.activeElement;for(const o of e)if(o===n||(o.focus(),document.activeElement!==n))return}function Gn(e,n){return e.map((o,c)=>e[(n+c)%e.length])}function Kn(e,n,o){const r=n.length>1&&Array.from(n).every(f=>f===n[0])?n[0]:n,a=o?e.indexOf(o):-1;let s=Gn(e,Math.max(a,0));r.length===1&&(s=s.filter(f=>f!==o));const u=s.find(f=>f.toLowerCase().startsWith(r.toLowerCase()));return u!==o?u:void 0}function Un(e,n){const{x:o,y:c}=e;let r=!1;for(let a=0,s=n.length-1;a<n.length;s=a++){const d=n[a].x,u=n[a].y,f=n[s].x,p=n[s].y;u>c!=p>c&&o<(f-d)*(c-u)/(p-u)+d&&(r=!r)}return r}function zn(e,n){if(!n)return!1;const o={x:e.clientX,y:e.clientY};return Un(o,n)}function oe(e){return n=>n.pointerType==="mouse"?e(n):void 0}const Vn=vn,Bn=vt,Yn=wn,Xn=hn,Hn=Rn,Wn=ye,qn=Mn,Zn=An,Jn=Tn,Qn=On,ec=Fn,tc=Ln,Mt="DropdownMenu",[oc,zc]=H(Mt,[gt]),y=gt(),[nc,It]=oc(Mt),cc=e=>{const{__scopeDropdownMenu:n,children:o,dir:c,open:r,defaultOpen:a,onOpenChange:s,modal:d=!0}=e,u=y(n),f=t.useRef(null),[p=!1,l]=xe({prop:r,defaultProp:a,onChange:s});return t.createElement(nc,{scope:n,triggerId:Y(),triggerRef:f,contentId:Y(),open:p,onOpenChange:l,onOpenToggle:t.useCallback(()=>l(b=>!b),[l]),modal:d},t.createElement(Vn,i({},u,{open:p,onOpenChange:l,dir:c,modal:d}),o))},rc="DropdownMenuTrigger",ac=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,disabled:c=!1,...r}=e,a=It(rc,o),s=y(o);return t.createElement(Bn,i({asChild:!0},s),t.createElement(I.button,i({type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":c?"":void 0,disabled:c},r,{ref:ze(n,a.triggerRef),onPointerDown:v(e.onPointerDown,d=>{!c&&d.button===0&&d.ctrlKey===!1&&(a.onOpenToggle(),a.open||d.preventDefault())}),onKeyDown:v(e.onKeyDown,d=>{c||(["Enter"," "].includes(d.key)&&a.onOpenToggle(),d.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(d.key)&&d.preventDefault())})})))}),sc=e=>{const{__scopeDropdownMenu:n,...o}=e,c=y(n);return t.createElement(Yn,i({},c,o))},dc="DropdownMenuContent",lc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=It(dc,o),a=y(o),s=t.useRef(!1);return t.createElement(Xn,i({id:r.contentId,"aria-labelledby":r.triggerId},a,c,{ref:n,onCloseAutoFocus:v(e.onCloseAutoFocus,d=>{var u;s.current||(u=r.triggerRef.current)===null||u===void 0||u.focus(),s.current=!1,d.preventDefault()}),onInteractOutside:v(e.onInteractOutside,d=>{const u=d.detail.originalEvent,f=u.button===0&&u.ctrlKey===!0,p=u.button===2||f;(!r.modal||p)&&(s.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),ic=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(Hn,i({},r,c,{ref:n}))}),uc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(Wn,i({},r,c,{ref:n}))}),fc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(qn,i({},r,c,{ref:n}))}),pc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(Zn,i({},r,c,{ref:n}))}),$c=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(Jn,i({},r,c,{ref:n}))}),mc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(Qn,i({},r,c,{ref:n}))}),bc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(ec,i({},r,c,{ref:n}))}),gc=t.forwardRef((e,n)=>{const{__scopeDropdownMenu:o,...c}=e,r=y(o);return t.createElement(tc,i({},r,c,{ref:n,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),xc=cc,vc=ac,_c=sc,yt=lc,Pt=ic,At=uc,Nt=fc,Tt=pc,Ot=$c,St=mc,Ft=bc,kt=gc,Vc=xc,Bc=vc,wc=t.forwardRef(({className:e,inset:n,children:o,...c},r)=>x.jsxs(Ft,{ref:r,className:h("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",n&&"pl-8",e),...c,children:[o,x.jsx(Wt,{className:"ml-auto h-4 w-4"})]}));wc.displayName=Ft.displayName;const Ec=t.forwardRef(({className:e,...n},o)=>x.jsx(kt,{ref:o,className:h("z-[1111111] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n}));Ec.displayName=kt.displayName;const hc=t.forwardRef(({className:e,sideOffset:n=4,...o},c)=>x.jsx(_c,{children:x.jsx(yt,{ref:c,sideOffset:n,className:h("z-[1111111] min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...o})}));hc.displayName=yt.displayName;const Cc=t.forwardRef(({className:e,inset:n,...o},c)=>x.jsx(At,{ref:c,className:h("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n&&"pl-8",e),...o}));Cc.displayName=At.displayName;const Dc=t.forwardRef(({className:e,children:n,checked:o,...c},r)=>x.jsxs(Nt,{ref:r,className:h("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:o,...c,children:[x.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:x.jsx(Ot,{children:x.jsx(Ht,{className:"h-4 w-4"})})}),n]}));Dc.displayName=Nt.displayName;const Rc=t.forwardRef(({className:e,children:n,...o},c)=>x.jsxs(Tt,{ref:c,className:h("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...o,children:[x.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:x.jsx(Ot,{children:x.jsx(qt,{className:"h-2 w-2 fill-current"})})}),n]}));Rc.displayName=Tt.displayName;const Mc=t.forwardRef(({className:e,inset:n,...o},c)=>x.jsx(Pt,{ref:c,className:h("px-2 py-1.5 text-sm font-semibold",n&&"pl-8",e),...o}));Mc.displayName=Pt.displayName;const Ic=t.forwardRef(({className:e,...n},o)=>x.jsx(St,{ref:o,className:h("-mx-1 my-1 h-px bg-muted",e),...n}));Ic.displayName=St.displayName;export{ut as $,jc as A,Wt as C,Fc as D,Ko as a,Uo as b,Vo as c,Bo as d,zo as e,Xo as f,go as g,xo as h,_o as i,wo as j,vo as k,Vc as l,Bc as m,hc as n,Cc as o,ft as p,Mc as q,Ic as r,kc as s,Co as t,Oc as u,No as v,Gc as w,Yo as x};