import{f as m,i}from"./vendor-22bbdd8b.js";const v=document.querySelector("#datetime-picker"),r=document.querySelector("[data-start]"),y=document.querySelector("[data-days]"),g=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),k=document.querySelector("[data-seconds]"),T=m(v,{enableTime:!0,time_24hr:!0,dateFormat:"Y-m-d H:i",defaultDate:new Date,onClose:function(e){e[0]>new Date?r.disabled=!1:(r.disabled=!0,i.show({message:"Please choose a date in the future",messageColor:"#fff",position:"topRight",backgroundColor:"#ef4040",animateInside:!1,color:"#fff"}))}});function n(e){return e.toString().padStart(2,"0")}function c({days:e,hours:t,minutes:s,seconds:o}){y.textContent=`${n(e)}`,g.textContent=`${n(t)}`,p.textContent=`${n(s)}`,k.textContent=`${n(o)}`,e===0&&t===0&&s===0&&o===0&&d.stop()}class C{constructor(t){this.tick=t,this.isActive=!1,this.lastTime=0,this.intervalId=null}start(t){if(!t){i.error({message:"Please select a valid date before starting the timer",messageColor:"#fff",position:"topRight",backgroundColor:"#ef4040",animateInside:!1,color:"#fff"});return}this.isActive||(this.isActive=!0,this.targetDate=t,this.intervalId=setInterval(()=>{const s=Date.now(),o=this.targetDate-s,a=this.convertMs(o);this.tick(a)},1e3),r.disabled=!0)}stop(){this.isActive&&(this.lastTime=0,this.isActive=!1,clearInterval(this.intervalId),c({days:0,hours:0,minutes:0,seconds:0}))}convertMs(t){const l=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),f=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:u,minutes:f,seconds:h}}}const d=new C(c);r.addEventListener("click",()=>{const e=T.selectedDates[0];d.start(e)});
//# sourceMappingURL=1-timer-6b2279cc.js.map
