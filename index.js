import{a as m,i as g}from"./assets/vendor-sTcFRZSV.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(s){if(s.ep)return;s.ep=!0;const t=r(s);fetch(s.href,t)}})();const b="https://furniture-store.b.goit.study/api",f={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},h=m.create({baseURL:b,headers:{"Content-Type":"application/json"}});async function L(n=1,e=10){try{return(await h.get(f.FURNITURES,{params:{page:n,limit:e}})).data}catch{return g.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}(()=>{const n=document.querySelector(".js-menu-container"),e=document.querySelector(".js-open-menu"),r=e.querySelector("use"),c=n.querySelectorAll(".nav-link, .mobile-order-btn"),s=()=>r.getAttribute("href").split("#")[0],t=()=>{const o=s();n.classList.remove("is-open"),e.setAttribute("aria-expanded",!1),r.setAttribute("href",`${o}#icon-burger`),e.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},i=()=>{const o=s();n.classList.add("is-open"),e.setAttribute("aria-expanded",!0),r.setAttribute("href",`${o}#icon-close`),e.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},a=()=>{n.classList.contains("is-open")?t():i()};e.addEventListener("click",a),c.forEach(o=>{o.addEventListener("click",()=>{n.classList.contains("is-open")&&t()})}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.classList.contains("is-open")&&t()}),document.addEventListener("click",o=>{const u=n.classList.contains("is-open"),d=n.contains(o.target),p=e.contains(o.target);u&&!d&&!p&&t()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",o=>{o.matches&&n.classList.contains("is-open")&&t()})})();let l=1;async function y(n=L(1,8)){const e=document.querySelector(".products-list");e.innerHTML="";try{const r=await n,c=r.furnitures||r,s=Math.ceil(r.totalItems/8);c&&c.length?c.forEach(t=>{const i=document.createElement("div");i.className="product-item",i.setAttribute("data-id",t._id),i.innerHTML=`
          <img src="${t.images[0]}" alt="${t.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${t.name}</p>
          <div class="colors">
            ${t.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${t.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,e.appendChild(i),v(s)}):e.innerHTML="<p>Товари не знайдені.</p>"}catch(r){console.error("Помилка завантаження товарів:",r),e.innerHTML="<p>Помилка завантаження товарів.</p>"}}function v(n){const e=document.querySelector(".pagination");e.innerHTML="",n>4?e.innerHTML=`
        <button class="btn-prev scroll">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <button class="page-number focus">${l}</button>
        <button class="page-number">${l+1}</button>
        <button class="page-number">${l+2}</button>
        <span class="dtp">...</span>
        <button class="page-number last">${n}</button>
        <button class="btn-next scroll"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" class="icon">
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg></button>
      `:console.log("totalItemspages",n)}addEventListener("DOMContentLoaded",()=>{y()});
//# sourceMappingURL=index.js.map
