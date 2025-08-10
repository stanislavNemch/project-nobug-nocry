import{a as K,i as l,S as T,N as B,P as O}from"./assets/vendor-BWsV38dq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const X="https://furniture-store.b.goit.study/api",b={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},L=K.create({baseURL:X,headers:{"Content-Type":"application/json"}});async function f(e=1,t=10,s){try{return(await L.get(b.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}async function Z(e){try{let t=1;const s=30;let r=0,o=0;do{const n=(await L.get(b.FURNITURES,{params:{page:t,limit:s}})).data,u=n.furnitures||n;t===1&&(r=n.totalItems||0,o=Math.ceil(r/s));const a=u.find(E=>E._id===e);if(a)return a;t++}while(t<=o);return l.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return console.error("Помилка при пошуку товару:",t),l.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}}async function Y(){try{return(await L.get(b.CATEGORIES)).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}}async function J(e=1,t=10){try{return(await L.get(b.FEEDBACKS,{params:{page:e,limit:t}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}}async function Q(e){try{const t=await L.post(b.ORDERS,e);return l.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch{return l.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}}async function ee(){try{return(await L.get(b.FURNITURES,{params:{type:"popular"}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),r=e.querySelectorAll(".nav-link, .mobile-order-btn"),o=()=>s.getAttribute("href").split("#")[0],i=()=>{const a=o();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${a}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},n=()=>{const a=o();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${a}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},u=()=>{e.classList.contains("is-open")?i():n()};t.addEventListener("click",u),r.forEach(a=>{a.addEventListener("click",()=>{e.classList.contains("is-open")&&i()})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&i()}),document.addEventListener("click",a=>{const E=e.classList.contains("is-open"),W=e.contains(a.target),G=t.contains(a.target);E&&!W&&!G&&i()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",a=>{a.matches&&e.classList.contains("is-open")&&i()})})();const k="/project-nobug-nocry/assets/sprite-CTbW2Ani.svg",H=document.querySelector(".product-categories-list"),v=document.querySelector(".pagination"),p=document.querySelector(".btn-loadMore"),N="Всі товари";let c=1,m=1,h=null;function te(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function se(e){e.target.closest(".product-categories-content").classList.add("active-category")}function oe(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function re(e){const t=e.map((s,r)=>`<li class="product-categories-item" data-id="${s._id}">
  <img
    class="product-categories-img"
    srcset="
                  ./img/category-imgs/category-img-${r+1}.webp    1x,
                  ./img/category-imgs/category-img-${r+1}@2x.webp 2x
                "
    src="./img/category-imgs/category-img-${r+1}.webp"
    alt="Зображення категорії ${s.name}"
  />
  <div class="product-categories-content">
    <p class="product-categories-descr">${s.name}</p>
  </div>
</li>`).join("");H.innerHTML=t}async function ie(){try{const e=await Y();re([{name:N,_id:"78fa12bc34de56f7890a1b35"},...e]),te()}catch{return[]}}function ne(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),r=t.dataset.id;c=1,oe(),se(e),s===N?(h=null,y(f(1,8))):(h=r,y(f(1,8,r)))}H.addEventListener("click",ne);async function y(e=f(c,8,h)){ce();const t=document.querySelector(".products-list"),s=document.querySelector(".pagination"),r=window.matchMedia("(max-width: 767px)").matches;(c===1||!r)&&(t.innerHTML="",s&&(s.innerHTML=""));try{const o=await e;C();const i=o.furnitures||o;m=Math.ceil(o.totalItems/8),i&&i.length?(i.forEach(n=>{const u=document.createElement("div");u.className="product-item",u.setAttribute("data-id",n._id),u.innerHTML=`
          <img src="${n.images[0]}" alt="${n.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${n.name}</p>
          <div class="colors">
            ${n.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${n.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,t.appendChild(u)}),r||(ae(c),le()),F()):(t.innerHTML="<p>Товари не знайдені.</p>",I())}catch{C(),t.innerHTML="<p>Помилка завантаження товарів.</p>",I()}}function ae(e){v.innerHTML="",v.innerHTML+=`
    <button class="btn-prev scroll">
      <svg class="swiper-button-icon" width="24" height="24">
                <use href="${k}#left-arrow-alt"/>
      </svg>
    </button>
  `;for(let t=e;t<=Math.min(e+2,m);t++)v.innerHTML+=`
      <button class="page-number ${t===e?"focus":""}">${t}</button>
    `;e+2<m&&(v.innerHTML+='<span class="dtp">...</span>',v.innerHTML+=`<button class="page-number last">${m}</button>`),v.innerHTML+=`
    <button class="btn-next scroll">
      <svg class="swiper-button-icon" width="24" height="24">
                <use href="${k}#right-arrow-alt" />
      </svg>
    </button>
  `}function ce(){const e=document.querySelector(".loader");e&&e.classList.remove("visuallyhidden")}function C(){const e=document.querySelector(".loader");e&&e.classList.add("visuallyhidden")}function le(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");e&&(c===1?e.classList.add("disabled"):e.classList.remove("disabled")),t&&(c>=m?t.classList.add("disabled"):t.classList.remove("disabled"))}function F(){if(!p)return;window.matchMedia("(max-width: 767px)").matches?c>=m?p.style.display="none":p.style.display="block":p.style.display="none"}function I(){p&&(p.style.display="none")}p&&p.addEventListener("click",async()=>{c<m&&(c++,await y(f(c,8,h)),setTimeout(()=>{const e=document.querySelector(".products-list .product-item:last-child");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100))});const q=document.getElementById("furniture");q&&q.addEventListener("click",async e=>{if(!window.matchMedia("(max-width: 767px)").matches){if(e.target.closest(".page-number")){const s=e.target.closest(".page-number"),r=parseInt(s.textContent,10);isNaN(r)||(c=r,await y(f(c,8,h)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300))}e.target.closest(".btn-next")&&c<m&&(c++,await y(f(c,8,h)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),e.target.closest(".btn-prev")&&c>1&&(c--,await y(f(c,8,h)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300))}});window.addEventListener("resize",()=>{F()});document.addEventListener("DOMContentLoaded",()=>{ie(),y()});class de{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}async init(){await this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())}async loadProducts(){this.showLoader();try{const t=await ee();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch{this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}}renderProducts(){const t=this.products.map(s=>`
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${s._id}">
          <img src="${s.images[0]}" alt="${s.name}" class="img-card" />
          <p class="text-card">${s.name}</p>
          <div class="colors">
            ${s.color.map(r=>`<span class="color-one" style="background-color:${r};"></span>`).join("")}
          </div>
          <p class="text-card">${s.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        </div>
      </div>
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new T(".popular-products-swiper",{modules:[B,O],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{console.log("Slide changed")}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const r=s.dataset.id;this.openProductModal(r)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#left-arrow-alt"></use>
          </svg>
        `),s&&!s.querySelector(".popular-products-icon")&&(s.innerHTML=`
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#right-arrow-alt"></use>
          </svg>
        `)},100)}openProductModal(t){const s=new CustomEvent("openProductModal",{detail:{productId:t}});document.dispatchEvent(s),console.log("Открыть модальное окно для товара:",t)}showLoader(){this.loader.classList.remove("hidden")}hideLoader(){this.loader.classList.add("hidden")}showError(t){this.swiperWrapper.innerHTML=`
      <div class="swiper-slide">
        <p class="error-message" style="text-align: center; padding: 40px; color: #666;">${t}</p>
      </div>
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new de});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const o=s.getAttribute("href");if(o){const i=o.split("#")[0];s.setAttribute("href",`${i}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(o=>{if(o!==e){const i=o.nextElementSibling,n=o.querySelector("use");if(i.classList.contains("open")&&(i.classList.remove("open"),n)){const u=n.getAttribute("href");if(u){const a=u.split("#")[0];n.setAttribute("href",`${a}#chevron-down`)}}}}),t.classList.add("open"),s){const o=s.getAttribute("href");if(o){const i=o.split("#")[0];s.setAttribute("href",`${i}#chevron-up`)}}})})});function ue(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function pe(e){const t=ue(e),s=Math.floor(t),r=t%1!==0,o=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';r&&(i+='<span class="star star-half">★</span>');for(let n=0;n<o;n++)i+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${i}</div>`}document.addEventListener("DOMContentLoaded",async()=>{try{const e=await J(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){l.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}me(e.feedbacks),ge()}catch{l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}});function me(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){l.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(r=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${pe(r.rate)}
                <p class="review-text">"${r.descr}"</p>
                <h3 class="reviewer-name">${r.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function ge(){try{if(!document.querySelector(".reviews .swiper")){l.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new T(".reviews .swiper",{modules:[B,O],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){P(this)},slideChange:function(){P(this)}}})}catch{l.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function P(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const fe=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,he=/^[0-9]{12}$/;let D=null,z=null,d=null,w=null,U=null;const V=document.querySelector(".close-btn");console.log(V);V.addEventListener("click",()=>{d.classList.add("visuallyhidden"),document.body.style.overflow=""});function _(){d=document.getElementById("order-backdrop"),w=document.querySelector(".order-form"),U=document.querySelector(".close-btn")}function ye(e,t){d.classList.remove("visuallyhidden"),d||_(),d&&(document.body.style.overflow="hidden",D=e,z=t)}const j=()=>{d&&(d.classList.add("visuallyhidden"),document.body.style.overflow=""),w&&w.reset()},ve=e=>{(e.target===d||e.target===U)&&j()},we=e=>{e.key==="Escape"&&d&&!d.classList.contains("visuallyhidden")&&j()};async function be(e){e.preventDefault();const t=new FormData(w),s=Object.fromEntries(t);if(s.modelId=D,s.color=z,!fe.test(s.email)){l.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"});return}if(!he.test(s.phone)){l.error({title:"Validation Error",message:"Please enter a valid 12-digit phone number (e.g., 380961234568).",position:"topRight"});return}if(!s.modelId||!s.color){l.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"});return}console.log("order data",s),Q(s)}function R(){_(),w&&w.addEventListener("submit",be),d&&d.addEventListener("click",ve),document.addEventListener("keydown",we)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",R):R();const g=document.querySelector(".modal-window"),x=document.querySelector(".products-list");let S=0,M="";function Le(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function Ee(e){const t=Le(e),s=Math.floor(t),r=t%1!==0,o=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';r&&(i+='<span class="star star-half">★</span>');for(let n=0;n<o;n++)i+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${i}</div>`}function Se(){const e=document.querySelector(".modalButton");e&&e.addEventListener("click",function(){g.classList.add("visuallyhidden"),document.body.style.overflow="",ye(S,M)})}async function $(e){document.body.style.overflow="hidden",g.classList.remove("visuallyhidden"),S=e;const t=await Z(S),s=Me(t);g.innerHTML=s;const r=document.querySelectorAll('input[name="furniture-color"]');r.length>0&&(r[0].checked=!0,M=r[0].value),r.forEach(o=>{o.addEventListener("change",function(){M=this.value})}),Se()}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;$(t)});x&&x.addEventListener("click",async function(e){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");await $(s)}}});const A=document.querySelector(".popular-products-swiper");A&&A.addEventListener("click",async function(e){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");await $(s)}}});function Me(e){return`
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
          ${Ee(e.rate)}
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
          
          <use href="./img/sprite.svg#icon-close"></use>
        </svg>
      </button>
  </div>`}g.addEventListener("click",function(e){const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");t||(g.classList.add("visuallyhidden"),document.body.style.overflow=""),s&&(g.classList.add("visuallyhidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&!g.classList.contains("visuallyhidden")&&(g.classList.add("visuallyhidden"),document.body.style.overflow="")});
//# sourceMappingURL=index.js.map
