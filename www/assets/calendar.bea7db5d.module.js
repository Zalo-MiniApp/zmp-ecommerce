var P=Object.defineProperty,S=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var b=(e,a,i)=>a in e?P(e,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[a]=i,v=(e,a)=>{for(var i in a||(a={}))x.call(a,i)&&b(e,i,a[i]);if(m)for(var i of m(a))g.call(a,i)&&b(e,i,a[i]);return e},N=(e,a)=>S(e,j(a));var w=(e,a)=>{var i={};for(var s in e)x.call(e,s)&&a.indexOf(s)<0&&(i[s]=e[s]);if(e!=null&&m)for(var s of m(e))a.indexOf(s)<0&&g.call(e,s)&&(i[s]=e[s]);return i};import{j as n,b as t,q as T,d as u,B as o,Z as d,z as y,r as h,f as p,u as D,P as F,F as z}from"./vendor.8fc7a751.module.js";import{u as $,P as M,T as k,s as Z}from"./index.61086c61.module.js";import{D as H,a as E}from"./district-name.2efa8870.module.js";const q=({layout:e,restaurant:a,before:i,after:s,onClick:l})=>{const r=()=>{y.views.main.router.navigate({path:"/restaurant",query:{id:a.id}})};return e==="cover"?n("div",{onClick:l!=null?l:r,className:"relative bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover",children:[t("div",{className:"aspect-cinema relative",children:t("img",{src:a.image,className:"absolute w-full h-full object-cover"})}),n("div",{className:"absolute left-3 top-3 py-1 px-3 flex items-center font-semibold text-sm text-white bg-primary rounded-full",children:[t(T,{zmp:"zi-star-solid"}),a.rating]}),t(u,{size:"small",className:"mt-2 mb-0 mx-4",children:a.name}),n(o,{flex:!0,mt:"0",children:[t(d,{className:"text-red-500",iconZMP:"zi-location-solid",small:!0,children:t("span",{className:"text-gray-500",children:t(H,{id:a.districtId})})}),t(d,{iconZMP:"zi-send-solid",small:!0,children:t("span",{className:"text-gray-500",children:t(E,{location:a.location})})})]})]}):t("div",{onClick:l!=null?l:r,className:"bg-white rounded-xl overflow-hidden p-0 restaurant-with-cover",children:n(o,{m:"0",flex:!0,children:[t("div",{className:"flex-none aspect-card relative w-32",children:t("img",{src:a.image,className:"absolute w-full h-full object-cover rounded-xl"})}),n(o,{my:"4",mx:"5",children:[i,t(u,{size:"small",children:a.name}),s,n(o,{mx:"0",mb:"0",flex:!0,children:[t(d,{iconZMP:"zi-star-solid",small:!0,className:"text-yellow-400 pl-0",children:t("span",{className:"text-gray-500",children:a.rating})}),t(d,{iconZMP:"zi-send-solid",small:!0,children:t("span",{className:"text-gray-500",children:t(E,{location:a.location})})})]})]})]})})},A=l=>{var r=l,{children:e,onSwipeLeft:a,onSwipeRight:i}=r,s=w(r,["children","onSwipeLeft","onSwipeRight"]);const c=f=>{const{clientX:I}=f.touches[0],{clientWidth:B}=f.currentTarget;I<B/2?a():i()};return t("div",N(v({},s),{onTouchMove:c,children:e}))},L=({booking:e})=>{var r;const[a]=$(e),[i,s]=h.exports.useState(!1),l=c=>{Z.dispatch("unbook",c)};return n(o,{flex:!0,alignItems:"center",children:[n(A,{onClick:()=>s(c=>!c),onSwipeLeft:()=>s(!0),onSwipeRight:()=>s(!1),className:"bg-white rounded-xl pb-8 pt-4 px-4 relative duration-200 w-full z-10",style:{left:i?-64:0},children:[n(o,{mx:"0",my:"4",flex:!0,justifyContent:"space-between",alignItems:"center",children:[n(u,{size:"small",className:"whitespace-nowrap mb-0",children:["Booking ID: ",e.id]}),t(p,{className:"ml-6 text-secondary mb-0 whitespace-nowrap",size:"large",bold:!0,children:t(M,{amount:a})})]}),t("div",{className:"border rounded-xl",children:t(q,{layout:"list-item",restaurant:e.restaurant,before:e.bookingInfo?n(p,{size:"small",className:"text-gray-500",children:[t(k,{time:(r=e.bookingInfo)==null?void 0:r.hour})," - ",e.bookingInfo.date.toLocaleDateString()]}):t(p,{size:"small",className:"text-gray-500",children:"Ch\u1EC9 \u0111\u1EB7t th\u1EE9c \u0103n"}),onClick:c=>{c.preventDefault(),c.stopPropagation(),s(!1),y.views.main.router.navigate({path:"/booking-detail/",query:{id:e.id}})}})})]}),t(d,{onClick:()=>l(e.id),typeName:"secondary",className:`absolute right-4 ${i?"opacity-100":"opacity-0"}`,children:"Hu\u1EF7"})]})},R={upcoming:"S\u1EAFp \u0111\u1EBFn",finished:"Ho\xE0n th\xE0nh"};function C({status:e,setStatus:a}){return n(z,{children:[t(o,{m:"0",className:"fixed top-0 left-0 right-0 pt-12",children:t(o,{m:"0",flex:!0,children:["upcoming","finished"].map(i=>t(d,{className:`border-b-2 rounded-none px-4 flex-1 mx-4 ${e===i?"border-primary":""}`,typeName:e===i?void 0:"ghost",onClick:()=>a(i),children:R[i]},i))})}),t(o,{height:48})]})}function J(){const[e,a]=h.exports.useState("upcoming"),i=D("bookings"),s=h.exports.useMemo(()=>i.filter(l=>{const r=new Date;return r.setHours(0,0,0,0),e=="finished"?l.bookingInfo&&l.bookingInfo.date<r:!l.bookingInfo||l.bookingInfo.date>=r}),[e,i]);return n(F,{children:[t(C,{status:e,setStatus:a}),s.length===0?n(o,{className:"text-center",mt:"10",children:["B\u1EA1n ch\u01B0a c\xF3 booking n\xE0o ",e==="upcoming"?"s\u1EAFp \u0111\u1EBFn":"ho\xE0n th\xE0nh","!"]}):t(z,{children:s.map(l=>t(o,{my:"4",children:t(L,{booking:l})},l.id))})]})}export{J as default};
