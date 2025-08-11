import{a as V,i as l,S as I,N as R,P}from"./assets/vendor-BWsV38dq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const _="https://furniture-store.b.goit.study/api",v={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},w=V.create({baseURL:_,headers:{"Content-Type":"application/json"}});async function f(e=1,t=10,s){try{return(await w.get(v.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}async function j(e){try{let t=1;const s=30;let i=0,o=0;do{const n=(await w.get(v.FURNITURES,{params:{page:t,limit:s}})).data,u=n.furnitures||n;t===1&&(i=n.totalItems||0,o=Math.ceil(i/s));const a=u.find(b=>b._id===e);if(a)return a;t++}while(t<=o);return l.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return console.error("Помилка при пошуку товару:",t),l.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}}async function W(){try{return(await w.get(v.CATEGORIES)).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}}async function G(e=1,t=10){try{return(await w.get(v.FEEDBACKS,{params:{page:e,limit:t}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}}async function K(e){try{const t=await w.post(v.ORDERS,e);return l.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch{return l.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}}async function Z(){try{return(await w.get(v.FURNITURES,{params:{type:"popular"}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),i=e.querySelectorAll(".nav-link, .mobile-order-btn"),o=()=>s.getAttribute("href").split("#")[0],r=()=>{const a=o();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${a}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},n=()=>{const a=o();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${a}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},u=()=>{e.classList.contains("is-open")?r():n()};t.addEventListener("click",u),i.forEach(a=>{a.addEventListener("click",()=>{e.classList.contains("is-open")&&r()})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&r()}),document.addEventListener("click",a=>{const b=e.classList.contains("is-open"),z=e.contains(a.target),U=t.contains(a.target);b&&!z&&!U&&r()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",a=>{a.matches&&e.classList.contains("is-open")&&r()})})();const T=document.querySelector(".product-categories-list"),m=document.querySelector(".pagination"),L=document.querySelector(".btn-loadMore"),A="Всі товари";let c=1,p=1;function X(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function Y(e){e.target.closest(".product-categories-content").classList.add("active-category")}function J(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function Q(e){const t=e.map((s,i)=>`<li class="product-categories-item" data-id="${s._id}">
  <img
    class="product-categories-img"
    srcset="
                  ./img/category-imgs/category-img-${i+1}.webp    1x,
                  ./img/category-imgs/category-img-${i+1}@2x.webp 2x
                "
    src="./img/category-imgs/category-img-${i+1}.webp"
    alt="Зображення категорії ${s.name}"
  />
  <div class="product-categories-content">
    <p class="product-categories-descr">${s.name}</p>
  </div>
</li>`).join("");T.innerHTML=t}async function ee(){try{const e=await W();Q([{name:A,_id:"78fa12bc34de56f7890a1b35"},...e]),X()}catch{return[]}}function te(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),i=t.dataset.id;c=1,J(),Y(e),h(s===A?f(1,8):f(1,8,i))}T.addEventListener("click",te);async function h(e=f(c,8)){se();const t=document.querySelector(".products-list"),s=document.querySelector(".pagination");s.innerHTML="";const i=window.matchMedia("(max-width: 767px)").matches;try{const o=await e;i||(t.style.opacity=0,t.innerHTML="",s&&(s.innerHTML="")),t.style.opacity=1,oe();const r=o.furnitures||o;p=Math.ceil(o.totalItems/8),r&&r.length?(r.forEach(n=>{const u=document.createElement("div");u.className="product-item",u.setAttribute("data-id",n._id),u.innerHTML=`
          <img src="${n.images[0]}" alt="${n.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${n.name}</p>
          <div class="colors">
            ${n.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${n.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,t.appendChild(u),$(p)}),$(c),re()):console.warn("Товари не знайдені.")}catch(o){console.error("Помилка завантаження товарів:",o),t.innerHTML="<p>Помилка завантаження товарів.</p>"}}function $(e){m.innerHTML="",m.innerHTML+=`
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `,e>1&&(m.innerHTML+=`
      <button class="page-number ${e===1?"focus":""}">1</button>
    `,m.innerHTML+='<span class="dtp" style="margin-right: 18px;" >...</span>');for(let t=e;t<=Math.min(e+2,p);t++)m.innerHTML+=`
      <button class="page-number ${t===e?"focus":""}">${t}</button>
    `;e+2<p&&(m.innerHTML+='<span class="dtp">...</span>',m.innerHTML+=`<button class="page-number last">${p}</button>`),m.innerHTML+=`
    <button class="btn-next scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  `}function se(){document.querySelector(".loader").classList.remove("visuallyhidden")}function oe(){document.querySelector(".loader").classList.add("visuallyhidden")}function re(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");c===1?e.classList.add("disabled"):e.classList.remove("disabled"),c>=p?t.classList.add("disabled"):t.classList.remove("disabled")}function ie(){c>=p?L.style.display="none":L.style.display="inline"}document.addEventListener("click",async e=>{if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),s=parseInt(t.textContent,10);isNaN(s)||(c=s,await h(f(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300))}e.target.closest(".btn-next")&&c<p&&(c++,await h(f(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),e.target.closest(".btn-prev")&&c>1&&(c--,await h(f(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),L.addEventListener("click",async()=>{c<p&&(c++,ie(),await h(f(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"nearest"})},100))})});document.addEventListener("DOMContentLoaded",()=>{ee(),h()});class ne{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}async init(){await this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())}async loadProducts(){this.showLoader();try{const t=await Z();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch{this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}}renderProducts(){const t=this.products.map(s=>`
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${s._id}">
          <img src="${s.images[0]}" alt="${s.name}" class="img-card" />
          <p class="text-card">${s.name}</p>
          <div class="colors">
            ${s.color.map(i=>`<span class="color-one" style="background-color:${i};"></span>`).join("")}
          </div>
          <p class="text-card">${s.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        </div>
      </div>
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new I(".popular-products-swiper",{modules:[R,P],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{console.log("Slide changed")}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const i=s.dataset.id;this.openProductModal(i)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
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
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new ne});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const o=s.getAttribute("href");if(o){const r=o.split("#")[0];s.setAttribute("href",`${r}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(o=>{if(o!==e){const r=o.nextElementSibling,n=o.querySelector("use");if(r.classList.contains("open")&&(r.classList.remove("open"),n)){const u=n.getAttribute("href");if(u){const a=u.split("#")[0];n.setAttribute("href",`${a}#chevron-down`)}}}}),t.classList.add("open"),s){const o=s.getAttribute("href");if(o){const r=o.split("#")[0];s.setAttribute("href",`${r}#chevron-up`)}}})})});function ae(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function ce(e){const t=ae(e),s=Math.floor(t),i=t%1!==0,o=5-Math.ceil(t);let r="";for(let n=0;n<s;n++)r+='<span class="star star-full">★</span>';i&&(r+='<span class="star star-half">★</span>');for(let n=0;n<o;n++)r+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${r}</div>`}document.addEventListener("DOMContentLoaded",async()=>{try{const e=await G(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){l.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}le(e.feedbacks),de()}catch{l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}});function le(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){l.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(i=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${ce(i.rate)}
                <p class="review-text">"${i.descr}"</p>
                <h3 class="reviewer-name">${i.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function de(){try{if(!document.querySelector(".reviews .swiper")){l.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new I(".reviews .swiper",{modules:[R,P],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){k(this)},slideChange:function(){k(this)}}})}catch{l.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function k(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const ue=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,pe=/^[0-9]{12}$/;let B=null,H=null,d=null,y=null,O=null;const F=document.querySelector(".close-btn");console.log(F);F.addEventListener("click",()=>{d.classList.add("visuallyhidden"),document.body.style.overflow=""});function N(){d=document.getElementById("order-backdrop"),y=document.querySelector(".order-form"),O=document.querySelector(".close-btn")}function me(e,t){d.classList.remove("visuallyhidden"),d||N(),d&&(document.body.style.overflow="hidden",B=e,H=t)}const D=()=>{d&&(d.classList.add("visuallyhidden"),document.body.style.overflow=""),y&&y.reset()},ge=e=>{(e.target===d||e.target===O)&&D()},fe=e=>{e.key==="Escape"&&d&&!d.classList.contains("visuallyhidden")&&D()};async function he(e){e.preventDefault();const t=new FormData(y),s=Object.fromEntries(t);if(s.modelId=B,s.color=H,!ue.test(s.email)){l.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"});return}if(!pe.test(s.phone)){l.error({title:"Validation Error",message:"Please enter a valid 12-digit phone number (e.g., 380961234568).",position:"topRight"});return}if(!s.modelId||!s.color){l.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"});return}console.log("order data",s),K(s)}function q(){N(),y&&y.addEventListener("submit",he),d&&d.addEventListener("click",ge),document.addEventListener("keydown",fe)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q):q();const ye="/project-nobug-nocry/assets/sprite-CTbW2Ani.svg",g=document.querySelector(".modal-window"),C=document.querySelector(".products-list");let E=0,S="";function ve(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function we(e){const t=ve(e),s=Math.floor(t),i=t%1!==0,o=5-Math.ceil(t);let r="";for(let n=0;n<s;n++)r+='<span class="star star-full">★</span>';i&&(r+='<span class="star star-half">★</span>');for(let n=0;n<o;n++)r+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${r}</div>`}function be(){const e=document.querySelector(".modalButton");e&&e.addEventListener("click",function(){g.classList.add("visuallyhidden"),document.body.style.overflow="",me(E,S)})}async function M(e){document.body.style.overflow="hidden",g.classList.remove("visuallyhidden"),E=e;const t=await j(E),s=Le(t);g.innerHTML=s;const i=document.querySelectorAll('input[name="furniture-color"]');i.length>0&&(i[0].checked=!0,S=i[0].value),i.forEach(o=>{o.addEventListener("change",function(){S=this.value})}),be()}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;M(t)});C&&C.addEventListener("click",async function(e){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");await M(s)}}});const x=document.querySelector(".popular-products-swiper");x&&x.addEventListener("click",async function(e){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");await M(s)}}});function Le(e){return`
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
          ${we(e.rate)}
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
          
          <use href="${ye}#icon-close"/>
        </svg>
      </button>
  </div>`}g.addEventListener("click",function(e){const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");t||(g.classList.add("visuallyhidden"),document.body.style.overflow=""),s&&(g.classList.add("visuallyhidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&!g.classList.contains("visuallyhidden")&&(g.classList.add("visuallyhidden"),document.body.style.overflow="")});
