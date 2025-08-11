var G=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var c=(e,t,s)=>new Promise((o,r)=>{var i=a=>{try{u(s.next(a))}catch(v){r(v)}},n=a=>{try{u(s.throw(a))}catch(v){r(v)}},u=a=>a.done?o(a.value):Promise.resolve(a.value).then(i,n);u((s=s.apply(e,t)).next())});import{a as K}from"./api-CGQni89X.js";import{i as d}from"./toast-CnhFlkt1.js";import{S as H,N as O,P as D}from"./swiper-BdJhUY6v.js";import"./accordion-n9T1KWKK.js";/* empty css               */var Ie=G(E=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const Z="https://furniture-store.b.goit.study/api",L={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},S=K.create({baseURL:Z,headers:{"Content-Type":"application/json"}});function y(e=1,t=10,s){return c(this,null,function*(){try{return(yield S.get(L.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch(o){return d.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}function X(e){return c(this,null,function*(){try{let t=1;const s=30;let o=0,r=0;do{const n=(yield S.get(L.FURNITURES,{params:{page:t,limit:s}})).data,u=n.furnitures||n;t===1&&(o=n.totalItems||0,r=Math.ceil(o/s));const a=u.find(v=>v._id===e);if(a)return a;t++}while(t<=r);return d.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return d.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}})}function Y(){return c(this,null,function*(){try{return(yield S.get(L.CATEGORIES)).data}catch(e){return d.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}})}function J(e=1,t=10){return c(this,null,function*(){try{return(yield S.get(L.FEEDBACKS,{params:{page:e,limit:t}})).data}catch(s){return d.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}})}function Q(e){return c(this,null,function*(){try{const t=yield S.post(L.ORDERS,e);return d.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch(t){return d.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}})}function ee(){return c(this,null,function*(){try{return(yield S.get(L.FURNITURES,{params:{type:"popular"}})).data}catch(e){return d.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),o=e.querySelectorAll(".nav-link, .mobile-order-btn"),r=()=>s.getAttribute("href").split("#")[0],i=()=>{const a=r();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${a}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},n=()=>{const a=r();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${a}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},u=()=>{e.classList.contains("is-open")?i():n()};t.addEventListener("click",u),o.forEach(a=>{a.addEventListener("click",()=>{e.classList.contains("is-open")&&i()})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&i()}),document.addEventListener("click",a=>{const v=e.classList.contains("is-open"),j=e.contains(a.target),W=t.contains(a.target);v&&!j&&!W&&i()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",a=>{a.matches&&e.classList.contains("is-open")&&i()})})();const F=document.querySelector(".product-categories-list"),g=document.querySelector(".pagination"),M=document.querySelector(".btn-loadMore"),N="Всі товари";let l=1,m=1;function te(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function se(e){e.target.closest(".product-categories-content").classList.add("active-category")}function oe(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function re(e){const t=e.map((s,o)=>`<li class="product-categories-item" data-id="${s._id}">
  <img
    class="product-categories-img"
    srcset="
                  ./img/category-imgs/category-img-${o+1}.webp    1x,
                  ./img/category-imgs/category-img-${o+1}@2x.webp 2x
                "
    src="./img/category-imgs/category-img-${o+1}.webp"
    alt="Зображення категорії ${s.name}"
  />
  <div class="product-categories-content">
    <p class="product-categories-descr">${s.name}</p>
  </div>
</li>`).join("");F.innerHTML=t}function ie(){return c(this,null,function*(){try{const e=yield Y();re([{name:N,_id:"78fa12bc34de56f7890a1b35"},...e]),te()}catch(e){return[]}})}function ne(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),o=t.dataset.id;l=1,oe(),se(e),w(s===N?y(1,8):y(1,8,o))}F.addEventListener("click",ne);function w(){return c(this,arguments,function*(e=y(l,8)){ae();const t=document.querySelector(".products-list"),s=document.querySelector(".pagination");s.innerHTML="";const o=window.matchMedia("(max-width: 767px)").matches;try{const r=yield e;o||(t.style.opacity=0,t.innerHTML="",s&&(s.innerHTML="")),t.style.opacity=1,ce();const i=r.furnitures||r;m=Math.ceil(r.totalItems/8),i&&i.length&&(i.forEach(n=>{const u=document.createElement("div");u.className="product-item",u.setAttribute("data-id",n._id),u.innerHTML=`
          <img src="${n.images[0]}" alt="${n.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${n.name}</p>
          <div class="colors">
            ${n.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${n.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,t.appendChild(u),C(m)}),C(l),le())}catch(r){t.innerHTML="<p>Помилка завантаження товарів.</p>"}})}function C(e){g.innerHTML="",g.innerHTML+=`
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `,e>1&&(g.innerHTML+=`
      <button class="page-number ${e===1?"focus":""}">1</button>
    `,g.innerHTML+='<span class="dtp" style="margin-right: 18px;" >...</span>');for(let t=e;t<=Math.min(e+2,m);t++)g.innerHTML+=`
      <button class="page-number ${t===e?"focus":""}">${t}</button>
    `;e+2<m&&(g.innerHTML+='<span class="dtp">...</span>',g.innerHTML+=`<button class="page-number last">${m}</button>`),g.innerHTML+=`
    <button class="btn-next scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  `}function ae(){document.querySelector(".loader").classList.remove("visuallyhidden")}function ce(){document.querySelector(".loader").classList.add("visuallyhidden")}function le(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");l===1?e.classList.add("disabled"):e.classList.remove("disabled"),l>=m?t.classList.add("disabled"):t.classList.remove("disabled")}function de(){l>=m?M.style.display="none":M.style.display="inline"}document.addEventListener("click",e=>c(E,null,function*(){if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),s=parseInt(t.textContent,10);isNaN(s)||(l=s,yield w(y(l,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300))}e.target.closest(".btn-next")&&l<m&&(l++,yield w(y(l,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),e.target.closest(".btn-prev")&&l>1&&(l--,yield w(y(l,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),M.addEventListener("click",()=>c(E,null,function*(){l<m&&(l++,de(),yield w(y(l,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"nearest"})},100))}))}));document.addEventListener("DOMContentLoaded",()=>{ie(),w()});class ue{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}init(){return c(this,null,function*(){yield this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())})}loadProducts(){return c(this,null,function*(){this.showLoader();try{const t=yield ee();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch(t){this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}})}renderProducts(){const t=this.products.map(s=>`
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${s._id}">
          <img src="${s.images[0]}" alt="${s.name}" class="img-card" />
          <p class="text-card">${s.name}</p>
          <div class="colors">
            ${s.color.map(o=>`<span class="color-one" style="background-color:${o};"></span>`).join("")}
          </div>
          <p class="text-card">${s.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        </div>
      </div>
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new H(".popular-products-swiper",{modules:[O,D],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const o=s.dataset.id;this.openProductModal(o)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#left-arrow-alt"></use>
          </svg>
        `),s&&!s.querySelector(".popular-products-icon")&&(s.innerHTML=`
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#right-arrow-alt"></use>
          </svg>
        `)},100)}openProductModal(t){const s=new CustomEvent("openProductModal",{detail:{productId:t}});document.dispatchEvent(s)}showLoader(){this.loader.classList.remove("hidden")}hideLoader(){this.loader.classList.add("hidden")}showError(t){this.swiperWrapper.innerHTML=`
      <div class="swiper-slide">
        <p class="error-message" style="text-align: center; padding: 40px; color: #666;">${t}</p>
      </div>
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new ue});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const r=s.getAttribute("href");if(r){const i=r.split("#")[0];s.setAttribute("href",`${i}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(r=>{if(r!==e){const i=r.nextElementSibling,n=r.querySelector("use");if(i.classList.contains("open")&&(i.classList.remove("open"),n)){const u=n.getAttribute("href");if(u){const a=u.split("#")[0];n.setAttribute("href",`${a}#chevron-down`)}}}}),t.classList.add("open"),s){const r=s.getAttribute("href");if(r){const i=r.split("#")[0];s.setAttribute("href",`${i}#chevron-up`)}}})})});function pe(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function me(e){const t=pe(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';o&&(i+='<span class="star star-half">★</span>');for(let n=0;n<r;n++)i+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${i}</div>`}document.addEventListener("DOMContentLoaded",()=>c(E,null,function*(){try{const e=yield J(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){d.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}ge(e.feedbacks),fe()}catch(e){d.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}}));function ge(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){d.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(o=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${me(o.rate)}
                <p class="review-text">"${o.descr}"</p>
                <h3 class="reviewer-name">${o.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function fe(){try{if(!document.querySelector(".reviews .swiper")){d.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new H(".reviews .swiper",{modules:[O,D],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){R(this)},slideChange:function(){R(this)}}})}catch(e){d.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function R(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const he=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,ve=/^[0-9]{12}$/;function b(e){return(e||"").replace(/\D/g,"")}function P(e){let t=b(e);t.startsWith("38")||(t="38"+t),t=t.slice(0,12);const s=t.slice(2);let o="+38";return s.length>0&&(o+=" ("+s.slice(0,Math.min(3,s.length))),s.length>=3&&(o+=")"),s.length>3&&(o+=" "+s.slice(3,Math.min(6,s.length))),s.length>6&&(o+=" "+s.slice(6,Math.min(8,s.length))),s.length>8&&(o+=" "+s.slice(8,Math.min(10,s.length))),o}function ye(e){e&&(b(e.value)?e.value=P(e.value):e.value="+38 ",e.addEventListener("input",()=>{const t=b(e.value);e.value=P(t)}),e.addEventListener("focus",()=>{b(e.value)||(e.value="+38 ")}),e.addEventListener("blur",()=>{(e.value.trim()==="+38"||e.value.trim()==="+38("||b(e.value)==="38")&&(e.value="")}))}let U=null,z=null,p=null,f=null,V=null;const x=document.querySelector(".close-btn");x&&x.addEventListener("click",()=>{p&&p.classList.add("visuallyhidden"),document.body.style.overflow=""});function _(){p=document.getElementById("order-backdrop"),f=document.querySelector(".order-form"),V=document.querySelector(".close-btn")}function we(e,t){p||_(),p&&(p.classList.remove("visuallyhidden"),document.body.style.overflow="hidden",U=e,z=t)}const q=()=>{p&&(p.classList.add("visuallyhidden"),document.body.style.overflow=""),f&&f.reset()},be=e=>{(e.target===p||e.target===V)&&q()},Le=e=>{e.key==="Escape"&&p&&!p.classList.contains("visuallyhidden")&&q()};function Se(e){return c(this,null,function*(){e.preventDefault();const t=new FormData(f),s=Object.fromEntries(t),o=f.querySelector(".submit-btn");if(o&&(o.disabled=!0),s.modelId=U,s.color=z,!he.test(s.email)){d.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"});return}const r=b(s.phone);if(!ve.test(r)){d.error({title:"Validation Error",message:"Please enter a valid phone like +38 (099) 123 22 11. Digits-only: 12 (e.g., 380991232211).",position:"topRight"});return}if(s.phone=r,!s.modelId||!s.color){d.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"});return}try{(yield Q(s))&&q()}catch(i){}finally{o&&(o.disabled=!1)}})}function T(){if(_(),f){f.addEventListener("submit",Se);const e=f.querySelector('input[name="phone"]');ye(e)}p&&p.addEventListener("click",be),document.addEventListener("keydown",Le)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",T):T();const Ee="/project-nobug-nocry/images/sprite-CTbW2Ani.svg",h=document.querySelector(".modal-window"),A=document.querySelector(".products-list");let $=0,k="";function Me(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function $e(e){const t=Me(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';o&&(i+='<span class="star star-half">★</span>');for(let n=0;n<r;n++)i+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${i}</div>`}function ke(){const e=document.querySelector(".modalButton");e&&e.addEventListener("click",function(){h.classList.add("visuallyhidden"),document.body.style.overflow="",we($,k)})}function I(e){return c(this,null,function*(){document.body.style.overflow="hidden",h.classList.remove("visuallyhidden"),$=e;const t=yield X($),s=qe(t);h.innerHTML=s;const o=document.querySelectorAll('input[name="furniture-color"]');o.length>0&&(o[0].checked=!0,k=o[0].value),o.forEach(r=>{r.addEventListener("change",function(){k=this.value})}),ke()})}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;I(t)});A&&A.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");yield I(s)}}})});const B=document.querySelector(".popular-products-swiper");B&&B.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");yield I(s)}}})});function qe(e){return`
  <div class="product-modalWindow">
    <div class="modal-left">
      <img class="modal-image-0" src="${e.images[0]}" alt="${e.description}" />
      <div class="modal-bottom-row">
        <img class="modal-image-1" src="${e.images[1]}" alt="${e.description}" />
        <img class="modal-image-2" src="${e.images[2]}" alt="${e.description}" />
      </div>
    </div>
    <div class="modal-right">
      <h2 class="product-modal-title">${e.name}</h2>
      <p class="modal-description">${e.category.name}</p>
      <div class="description-container">
        <div class="modal-price-rating">
          <h3 class="modal-price">${e.price} грн</h3>
          ${$e(e.rate)}
        </div>
        <div class="color-options">
          <p class="color-label">Колір</p>
          <div class="radio-group">
            <div class="radio-wrapper">
              <input type="radio" id="color1" name="furniture-color" value="${e.color[0]}" class="color-radio" />
              <label for="color1" class="color-circle" style="background-color: ${e.color[0]}"></label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="color2" name="furniture-color" value="${e.color[1]}" class="color-radio" />
              <label for="color2" class="color-circle" style="background-color: ${e.color[1]}"></label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="color3" name="furniture-color" value="${e.color[2]}" class="color-radio" />
              <label for="color3" class="color-circle" style="background-color: ${e.color[2]}"></label>
            </div>
          </div>
        </div>
        <p class="furnitureDescription">${e.description}</p>
        <p class="furnitureSize">${e.sizes}</p>
        <button class="modalButton">Перейти до замовлення</button>
      </div>
    </div>
    <button type="button" class="modal-close-btn" >
        <svg class="close-icon" width="14" height="14">
          
          <use href="${Ee}#icon-close"/>
        </svg>
      </button>
  </div>`}h.addEventListener("click",function(e){const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");t||(h.classList.add("visuallyhidden"),document.body.style.overflow=""),s&&(h.classList.add("visuallyhidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&!h.classList.contains("visuallyhidden")&&(h.classList.add("visuallyhidden"),document.body.style.overflow="")})});export default Ie();
