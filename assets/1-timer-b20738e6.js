import{f as l,i as m}from"./vendor-651d7991.js";const f=document.querySelector("#datetime-picker"),a=document.querySelector("[data-start]"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),g=document.querySelector("[data-seconds]"),k=l(f,{enableTime:!0,time_24hr:!0,dateFormat:"Y-m-d H:i",defaultDate:new Date,onClose:function(e){e[0]>new Date?a.disabled=!1:(a.disabled=!0,m.show({message:"Please choose a date in the future",messageColor:"#fff",position:"topRight",backgroundColor:"#ef4040",animateInside:!1,color:"#fff"}))}});function n(e){return e.toString().padStart(2,"0")}function S({days:e,hours:t,minutes:o,seconds:s}){h.textContent=`${n(e)}`,y.textContent=`${n(t)}`,D.textContent=`${n(o)}`,g.textContent=`${n(s)}`}class T{constructor(t){this.tick=t,this.isActive=!1}start(t){this.isActive||(this.isActive=!0,this.targetDate=t,setInterval(()=>{const o=Date.now(),s=this.targetDate-o,r=this.convertMs(s);this.tick(r)},1e3))}convertMs(t){const c=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),u=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:i,minutes:d,seconds:u}}}const p=new T(S);a.addEventListener("click",()=>{a.disabled=!0;const e=k.selectedDates[0];p.start(e)});
//# sourceMappingURL=1-timer-b20738e6.js.map
