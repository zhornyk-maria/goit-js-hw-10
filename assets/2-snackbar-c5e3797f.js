import{i as o}from"./vendor-22bbdd8b.js";const n=document.querySelector(".form");n.addEventListener("submit",function(i){i.preventDefault();const t=new FormData(this),s=parseInt(t.get("delay")),f=t.get("state");new Promise((e,a)=>{setTimeout(()=>{f==="fulfilled"?e(s):a(s)},s)}).then(e=>{o.success({icon:!1,messageColor:"#fff",position:"topRight",titleColor:"#fff",message:`✅ Fulfilled promise in ${e}ms`,animateInside:!1})},e=>{o.error({icon:!1,messageColor:"#fff",position:"topRight",animateInside:!1,titleColor:"#fff",message:`❌ Rejected promise in ${e}ms`})}),this.reset()});
//# sourceMappingURL=2-snackbar-c5e3797f.js.map
