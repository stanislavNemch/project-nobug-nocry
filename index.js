import{a as j,i as l,S as A,N as B,P as H}from"./assets/vendor-BWsV38dq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const W="https://furniture-store.b.goit.study/api",w={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},b=j.create({baseURL:W,headers:{"Content-Type":"application/json"}});async function h(e=1,t=10,s){try{return(await b.get(w.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}async function G(e){try{let t=1;const s=30;let o=0,r=0;do{const n=(await b.get(w.FURNITURES,{params:{page:t,limit:s}})).data,u=n.furnitures||n;t===1&&(o=n.totalItems||0,r=Math.ceil(o/s));const a=u.find(L=>L._id===e);if(a)return a;t++}while(t<=r);return l.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return console.error("Помилка при пошуку товару:",t),l.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}}async function K(){try{return(await b.get(w.CATEGORIES)).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}}async function Z(e=1,t=10){try{return(await b.get(w.FEEDBACKS,{params:{page:e,limit:t}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}}async function X(e){try{const t=await b.post(w.ORDERS,e);return l.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch{return l.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}}async function Y(){try{return(await b.get(w.FURNITURES,{params:{type:"popular"}})).data}catch{return l.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),o=e.querySelectorAll(".nav-link, .mobile-order-btn"),r=()=>s.getAttribute("href").split("#")[0],i=()=>{const a=r();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${a}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll")},n=()=>{const a=r();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${a}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll")},u=()=>{e.classList.contains("is-open")?i():n()};t.addEventListener("click",u),o.forEach(a=>{a.addEventListener("click",()=>{e.classList.contains("is-open")&&i()})}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&i()}),document.addEventListener("click",a=>{const L=e.classList.contains("is-open"),V=e.contains(a.target),_=t.contains(a.target);L&&!V&&!_&&i()}),window.matchMedia("(min-width: 1440px)").addEventListener("change",a=>{a.matches&&e.classList.contains("is-open")&&i()})})();const O=document.querySelector(".product-categories-list"),m=document.querySelector(".pagination"),S=document.querySelector(".btn-loadMore"),D="Всі товари";let c=1,p=1;function J(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function Q(e){e.target.closest(".product-categories-content").classList.add("active-category")}function ee(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function te(e){const t=e.map((s,o)=>`<li class="product-categories-item" data-id="${s._id}">
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
</li>`).join("");O.innerHTML=t}async function se(){try{const e=await K();te([{name:D,_id:"78fa12bc34de56f7890a1b35"},...e]),J()}catch{return[]}}function oe(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),o=t.dataset.id;c=1,ee(),Q(e),v(s===D?h(1,8):h(1,8,o))}O.addEventListener("click",oe);async function v(e=h(c,8)){re();const t=document.querySelector(".products-list"),s=document.querySelector(".pagination");s.innerHTML="";const o=window.matchMedia("(max-width: 767px)").matches;try{const r=await e;o||(t.style.opacity=0,t.innerHTML="",s&&(s.innerHTML="")),t.style.opacity=1,ie();const i=r.furnitures||r;p=Math.ceil(r.totalItems/8),i&&i.length?(i.forEach(n=>{const u=document.createElement("div");u.className="product-item",u.setAttribute("data-id",n._id),u.innerHTML=`
          <img src="${n.images[0]}" alt="${n.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${n.name}</p>
          <div class="colors">
            ${n.color.map(a=>`<span class="color-one" style="background-color:${a};"></span>`).join("")}
          </div>
          <p class="text-card">${n.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `,t.appendChild(u),q(p)}),q(c),ne()):console.warn("Товари не знайдені.")}catch(r){console.error("Помилка завантаження товарів:",r),t.innerHTML="<p>Помилка завантаження товарів.</p>"}}function q(e){m.innerHTML="",m.innerHTML+=`
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
  `}function re(){document.querySelector(".loader").classList.remove("visuallyhidden")}function ie(){document.querySelector(".loader").classList.add("visuallyhidden")}function ne(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");c===1?e.classList.add("disabled"):e.classList.remove("disabled"),c>=p?t.classList.add("disabled"):t.classList.remove("disabled")}function ae(){c>=p?S.style.display="none":S.style.display="inline"}document.addEventListener("click",async e=>{if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),s=parseInt(t.textContent,10);isNaN(s)||(c=s,await v(h(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300))}e.target.closest(".btn-next")&&c<p&&(c++,await v(h(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),e.target.closest(".btn-prev")&&c>1&&(c--,await v(h(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"end"})},300)),S.addEventListener("click",async()=>{c<p&&(c++,ae(),await v(h(c,8)),setTimeout(()=>{document.querySelector(".products-list").scrollIntoView({behavior:"smooth",block:"nearest"})},100))})});document.addEventListener("DOMContentLoaded",()=>{se(),v()});class ce{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}async init(){await this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())}async loadProducts(){this.showLoader();try{const t=await Y();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch{this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}}renderProducts(){const t=this.products.map(s=>`
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
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new A(".popular-products-swiper",{modules:[B,H],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{console.log("Slide changed")}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const o=s.dataset.id;this.openProductModal(o)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
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
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new ce});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const r=s.getAttribute("href");if(r){const i=r.split("#")[0];s.setAttribute("href",`${i}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(r=>{if(r!==e){const i=r.nextElementSibling,n=r.querySelector("use");if(i.classList.contains("open")&&(i.classList.remove("open"),n)){const u=n.getAttribute("href");if(u){const a=u.split("#")[0];n.setAttribute("href",`${a}#chevron-down`)}}}}),t.classList.add("open"),s){const r=s.getAttribute("href");if(r){const i=r.split("#")[0];s.setAttribute("href",`${i}#chevron-up`)}}})})});function le(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function de(e){const t=le(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';o&&(i+='<span class="star star-half">★</span>');for(let n=0;n<r;n++)i+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${i}</div>`}document.addEventListener("DOMContentLoaded",async()=>{try{const e=await Z(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){l.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}ue(e.feedbacks),pe()}catch{l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}});function ue(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){l.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(o=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${de(o.rate)}
                <p class="review-text">"${o.descr}"</p>
                <h3 class="reviewer-name">${o.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function pe(){try{if(!document.querySelector(".reviews .swiper")){l.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new A(".reviews .swiper",{modules:[B,H],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){C(this)},slideChange:function(){C(this)}}})}catch{l.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function C(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const me=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,ge=/^[0-9]{12}$/;function y(e){return(e||"").replace(/\D/g,"")}function I(e){let t=y(e);t.startsWith("38")||(t="38"+t),t=t.slice(0,12);const s=t.slice(2);let o="+38";return s.length>0&&(o+=" ("+s.slice(0,Math.min(3,s.length))),s.length>=3&&(o+=")"),s.length>3&&(o+=" "+s.slice(3,Math.min(6,s.length))),s.length>6&&(o+=" "+s.slice(6,Math.min(8,s.length))),s.length>8&&(o+=" "+s.slice(8,Math.min(10,s.length))),o}function fe(e){e&&(y(e.value)?e.value=I(e.value):e.value="+38 ",e.addEventListener("input",()=>{const t=y(e.value);e.value=I(t)}),e.addEventListener("focus",()=>{y(e.value)||(e.value="+38 ")}),e.addEventListener("blur",()=>{(e.value.trim()==="+38"||e.value.trim()==="+38("||y(e.value)==="38")&&(e.value="")}))}let F=null,N=null,d=null,g=null,U=null;const x=document.querySelector(".close-btn");x&&x.addEventListener("click",()=>{d&&d.classList.add("visuallyhidden"),document.body.style.overflow=""});function z(){d=document.getElementById("order-backdrop"),g=document.querySelector(".order-form"),U=document.querySelector(".close-btn")}function he(e,t){d||z(),d&&(d.classList.remove("visuallyhidden"),document.body.style.overflow="hidden",F=e,N=t)}const $=()=>{d&&(d.classList.add("visuallyhidden"),document.body.style.overflow=""),g&&g.reset()},ve=e=>{(e.target===d||e.target===U)&&$()},ye=e=>{e.key==="Escape"&&d&&!d.classList.contains("visuallyhidden")&&$()};async function we(e){e.preventDefault();const t=new FormData(g),s=Object.fromEntries(t),o=g.querySelector(".submit-btn");if(o&&(o.disabled=!0),s.modelId=F,s.color=N,!me.test(s.email)){l.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"});return}const r=y(s.phone);if(!ge.test(r)){l.error({title:"Validation Error",message:"Please enter a valid phone like +38 (099) 123 22 11. Digits-only: 12 (e.g., 380991232211).",position:"topRight"});return}if(s.phone=r,!s.modelId||!s.color){l.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"});return}console.log("order data",s);try{await X(s)&&$()}catch{}finally{o&&(o.disabled=!1)}}function R(){if(z(),g){g.addEventListener("submit",we);const e=g.querySelector('input[name="phone"]');fe(e)}d&&d.addEventListener("click",ve),document.addEventListener("keydown",ye)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",R):R();const be="/project-nobug-nocry/assets/sprite-CTbW2Ani.svg",f=document.querySelector(".modal-window"),P=document.querySelector(".products-list");let E=0,M="";function Le(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function Se(e){const t=Le(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let i="";for(let n=0;n<s;n++)i+='<span class="star star-full">★</span>';o&&(i+='<span class="star star-half">★</span>');for(let n=0;n<r;n++)i+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${i}</div>`}function Ee(){const e=document.querySelector(".modalButton");e&&e.addEventListener("click",function(){f.classList.add("visuallyhidden"),document.body.style.overflow="",he(E,M)})}async function k(e){document.body.style.overflow="hidden",f.classList.remove("visuallyhidden"),E=e;const t=await G(E),s=Me(t);f.innerHTML=s;const o=document.querySelectorAll('input[name="furniture-color"]');o.length>0&&(o[0].checked=!0,M=o[0].value),o.forEach(r=>{r.addEventListener("change",function(){M=this.value})}),Ee()}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;k(t)});P&&P.addEventListener("click",async function(e){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");await k(s)}}});const T=document.querySelector(".popular-products-swiper");T&&T.addEventListener("click",async function(e){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");await k(s)}}});function Me(e){return`
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
          ${Se(e.rate)}
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
          
          <use href="${be}#icon-close"/>
        </svg>
      </button>
  </div>`}f.addEventListener("click",function(e){const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");t||(f.classList.add("visuallyhidden"),document.body.style.overflow=""),s&&(f.classList.add("visuallyhidden"),document.body.style.overflow="")});document.addEventListener("keydown",e=>{e.key==="Escape"&&!f.classList.contains("visuallyhidden")&&(f.classList.add("visuallyhidden"),document.body.style.overflow="")});
