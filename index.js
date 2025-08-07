import{a as h,i as L}from"./assets/vendor-sTcFRZSV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const y="https://furniture-store.b.goit.study/api",v={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},M=h.create({baseURL:y,headers:{"Content-Type":"application/json"}});async function d(e=1,t=10){try{return(await M.get(v.FURNITURES,{params:{page:e,limit:t}})).data}catch{return L.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),o=t.querySelector("use"),c=e.querySelectorAll(".nav-link, .mobile-order-btn"),n=()=>o.getAttribute("href").split("#")[0],s=()=>{const r=n();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),o.setAttribute("href",`${r}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},a=()=>{const r=n();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),o.setAttribute("href",`${r}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},m=()=>{e.classList.contains("is-open")?s():a()};t.addEventListener("click",m),c.forEach(r=>{r.addEventListener("click",()=>{e.classList.contains("is-open")&&s()})}),document.addEventListener("keydown",r=>{r.key==="Escape"&&e.classList.contains("is-open")&&s()}),document.addEventListener("click",r=>{const f=e.classList.contains("is-open"),g=e.contains(r.target),b=t.contains(r.target);f&&!g&&!b&&s()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",r=>{r.matches&&e.classList.contains("is-open")&&s()})})();let i=1,u=1;const l=document.querySelector(".pagination");async function p(e=d(i,8)){const t=document.querySelector(".products-list");t.innerHTML="";try{const o=await e,c=o.furnitures||o;u=Math.ceil(o.totalItems/8),c&&c.length?(c.forEach(n=>{const s=document.createElement("div");s.className="product-item",s.setAttribute("data-id",n._id),s.innerHTML=`
          <img src="${n.images[0]}" alt="${n.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${n.name}</p>
          <div class="colors">
            ${n.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${n.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,t.appendChild(s)}),E(i),x()):t.innerHTML="<p>Товари не знайдені.</p>"}catch(o){console.error("Помилка завантаження товарів:",o),t.innerHTML="<p>Помилка завантаження товарів.</p>"}}function E(e){l.innerHTML="",l.innerHTML+=`
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `;for(let t=e;t<=Math.min(e+2,u);t++)l.innerHTML+=`
      <button class="page-number ${t===e?"focus":""}">${t}</button>
    `;e+2<u&&(l.innerHTML+='<span class="dtp">...</span>',l.innerHTML+=`<button class="page-number last">${u}</button>`),l.innerHTML+=`
    <button class="btn-next scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  `}function x(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");i===1?e.classList.add("disabled"):e.classList.remove("disabled"),i>=u?t.classList.add("disabled"):t.classList.remove("disabled")}document.addEventListener("click",e=>{if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),o=parseInt(t.textContent,10);isNaN(o)||(i=o,p(d(i,8)))}e.target.closest(".btn-next")&&i<u&&(i++,p(d(i,8))),e.target.closest(".btn-prev")&&i>1&&(i--,p(d(i,8)))});document.addEventListener("DOMContentLoaded",()=>{p()});
//# sourceMappingURL=index.js.map
