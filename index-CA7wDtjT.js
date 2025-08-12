var de=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var c=(e,t,s)=>new Promise((o,r)=>{var n=u=>{try{d(s.next(u))}catch(v){r(v)}},i=u=>{try{d(s.throw(u))}catch(v){r(v)}},d=u=>u.done?o(u.value):Promise.resolve(u.value).then(n,i);d((s=s.apply(e,t)).next())});import{a as ue}from"./api-CGQni89X.js";import{i as l}from"./toast-CnhFlkt1.js";import{S as Y,N as J,P as Q}from"./swiper-BdJhUY6v.js";import"./accordion-n9T1KWKK.js";/* empty css               */var Je=de(q=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const pe="https://furniture-store.b.goit.study/api",S={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},M=ue.create({baseURL:pe,headers:{"Content-Type":"application/json"}});function y(e=1,t=10,s){return c(this,null,function*(){try{return(yield M.get(S.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch(o){return l.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}function me(e){return c(this,null,function*(){try{let t=1;const s=30;let o=0,r=0;do{const i=(yield M.get(S.FURNITURES,{params:{page:t,limit:s}})).data,d=i.furnitures||i;t===1&&(o=i.totalItems||0,r=Math.ceil(o/s));const u=d.find(v=>v._id===e);if(u)return u;t++}while(t<=r);return l.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return l.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}})}function ge(){return c(this,null,function*(){try{return(yield M.get(S.CATEGORIES)).data}catch(e){return l.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}})}function fe(e=1,t=10){return c(this,null,function*(){try{return(yield M.get(S.FEEDBACKS,{params:{page:e,limit:t}})).data}catch(s){return l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}})}function he(e){return c(this,null,function*(){try{const t=yield M.post(S.ORDERS,e);return l.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch(t){return l.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}})}function ve(){return c(this,null,function*(){try{return(yield M.get(S.FURNITURES,{params:{type:"popular"}})).data}catch(e){return l.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),o=e.querySelectorAll(".nav-link, .mobile-order-btn");let r=null,n=null;const i=()=>s.getAttribute("href").split("#")[0],d=()=>p=>{p.key==="Escape"&&k()},u=()=>p=>{const ce=e.contains(p.target),le=t.contains(p.target);!ce&&!le&&k()},v=()=>{r||(r=d()),n||(n=u()),document.addEventListener("keydown",r),document.addEventListener("click",n)},U=()=>{r&&document.removeEventListener("keydown",r),n&&document.removeEventListener("click",n)},k=()=>{const p=i();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${p}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),U()},ie=()=>{const p=i();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${p}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),v()},ae=()=>{e.classList.contains("is-open")?k():ie()};t.addEventListener("click",ae),o.forEach(p=>{p.addEventListener("click",()=>{e.classList.contains("is-open")&&k()})});const z=window.matchMedia("(min-width: 1440px)"),W=p=>{p.matches&&e.classList.contains("is-open")&&k()};z.addEventListener("change",W),window.addEventListener("beforeunload",()=>{U(),z.removeEventListener("change",W)})})();const ee=document.querySelector(".product-categories-list"),g=document.querySelector(".pagination"),R=document.querySelector(".btn-loadMore"),te="Всі товари";let a=1,f=1,L=null;function ye(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function we(e){e.target.closest(".product-categories-content").classList.add("active-category")}function be(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function Le(e){const t=e.map((s,o)=>`<li class="product-categories-item" data-id="${s._id}">
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
</li>`).join("");ee.innerHTML=t}function Ee(){return c(this,null,function*(){try{const e=yield ge();Le([{name:te,_id:"78fa12bc34de56f7890a1b35"},...e]),ye()}catch(e){return[]}})}function Se(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),o=t.dataset.id;a=1,be(),we(e),s===te?(L=null,w(y(1,8))):(L=o,w(y(1,8,o)))}ee.addEventListener("click",Se);function Me(e=8){const t=document.querySelector(".products-list");t.innerHTML="";for(let s=0;s<e;s++){const o=document.createElement("div");o.className="product-item skeleton",o.innerHTML=`
      <div class="skeleton-box" style="width:100%; height:256px; margin-bottom:10px;"></div>
      <div class="skeleton-box" style="width:80%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:60%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:40%; height:16px; margin-bottom:12px;"></div>
      <button class="btn btn-go-modal">Детальніше</button>
    `,t.appendChild(o)}}function w(){return c(this,arguments,function*(e=y(a,8)){const t=document.querySelector(".products-list"),s=window.matchMedia("(max-width: 767px)").matches,o=t.querySelectorAll(".product-item").length;(!s||a===1)&&Me(8),$e();try{const r=yield e,n=r.furnitures||r;if(f=Math.ceil(r.totalItems/8),s&&a>1){n.forEach(d=>{t.appendChild(j(d))});const i=t.querySelectorAll(".product-item")[o];i&&i.scrollIntoView({behavior:"smooth",block:"start"})}else t.innerHTML="",n.forEach(i=>{t.appendChild(j(i))});s?se():(ke(a),Ce())}catch(r){t.innerHTML="<p>Помилка завантаження товарів.</p>"}finally{xe()}})}function j(e){const t=document.createElement("li");return t.className="product-item",t.setAttribute("data-id",e._id),t.innerHTML=`
    <img src="${e.images[0]}" alt="${e.name}" class="img-card" width="100%" height="256px" />
    <p class="text-card">${e.name}</p>
    <div class="colors">
      ${e.color.map(s=>`<span class="color-one" style="background-color:${s};"></span>`).join("")}
    </div>
    <p class="text-card">${e.price} грн</p>
    <button class="btn btn-go-modal">Детальніше</button>
  `,t}function ke(e){g.innerHTML="",g.innerHTML+=`
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `,e>1&&(g.innerHTML+=`
      <button class="page-number ${e===1?"focus":""}">1</button>
    `,g.innerHTML+='<span class="dtp" style="margin-right: 18px;">...</span>');for(let t=e;t<=Math.min(e+2,f);t++)g.innerHTML+=`
      <button class="page-number ${t===e?"focus":""}">${t}</button>
    `;e+2<f&&(g.innerHTML+='<span class="dtp">...</span>',g.innerHTML+=`<button class="page-number last">${f}</button>`),g.innerHTML+=`
    <button class="btn-next scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  `}function $e(){document.querySelector(".loader").classList.remove("visuallyhidden")}function xe(){document.querySelector(".loader").classList.add("visuallyhidden")}function Ce(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");a===1?e.classList.add("disabled"):e.classList.remove("disabled"),a>=f?t.classList.add("disabled"):t.classList.remove("disabled")}function se(){a>=f?R.style.display="none":R.style.display="inline"}document.addEventListener("click",e=>c(q,null,function*(){if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),s=parseInt(t.textContent,10);isNaN(s)||(a=s,yield w(y(a,8,L)))}e.target.closest(".btn-next")&&a<f&&(a++,yield w(y(a,8,L))),e.target.closest(".btn-prev")&&a>1&&(a--,yield w(y(a,8,L)))}));R.addEventListener("click",()=>c(q,null,function*(){a<f&&(a++,se(),yield w(y(a,8,L)))}));document.addEventListener("DOMContentLoaded",()=>{Ee(),w()});class He{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}init(){return c(this,null,function*(){yield this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())})}loadProducts(){return c(this,null,function*(){this.showLoader();try{const t=yield ve();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch(t){this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}})}renderProducts(){const t=this.products.map(s=>`
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${s._id}">
          <img src="${s.images[0]}" alt="${s.name}" class="img-card" />
          <p class="text-card">${s.name}</p>
          <div class="colors">
            ${s.color.map(o=>`<span class="color-one" style="background-color:${o};"></span>`).join("")}
          </div>
          <p class="text-card">${s.price} грн</p>
          <div class="product-bottom">
            <button class="btn btn-go-modal">Детальніше</button>
          </div>
        </div>
      </div>
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new Y(".popular-products-swiper",{modules:[J,Q],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const o=s.dataset.id;this.openProductModal(o)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
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
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new He});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const r=s.getAttribute("href");if(r){const n=r.split("#")[0];s.setAttribute("href",`${n}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(r=>{if(r!==e){const n=r.nextElementSibling,i=r.querySelector("use");if(n.classList.contains("open")&&(n.classList.remove("open"),i)){const d=i.getAttribute("href");if(d){const u=d.split("#")[0];i.setAttribute("href",`${u}#chevron-down`)}}}}),t.classList.add("open"),s){const r=s.getAttribute("href");if(r){const n=r.split("#")[0];s.setAttribute("href",`${n}#chevron-up`)}}})})});function Ie(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function qe(e){const t=Ie(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let n="";for(let i=0;i<s;i++)n+='<span class="star star-full">★</span>';o&&(n+='<span class="star star-half">★</span>');for(let i=0;i<r;i++)n+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${n}</div>`}document.addEventListener("DOMContentLoaded",()=>c(q,null,function*(){try{const e=yield fe(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){l.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}Pe(e.feedbacks),Re()}catch(e){l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}}));function Pe(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){l.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(o=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${qe(o.rate)}
                <p class="review-text">"${o.descr}"</p>
                <h3 class="reviewer-name">${o.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function Re(){try{if(!document.querySelector(".reviews .swiper")){l.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new Y(".reviews .swiper",{modules:[J,Q],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){V(this)},slideChange:function(){V(this)}}})}catch(e){l.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function V(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const Ae=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,Be=/^[0-9]{12}$/;let $=null,x=null,P=null;function b(e){return(e||"").replace(/\D/g,"")}function _(e){let t=b(e);t.startsWith("38")||(t="38"+t),t=t.slice(0,12);const s=t.slice(2);let o="+38";return s.length>0&&(o+=" ("+s.slice(0,Math.min(3,s.length))),s.length>=3&&(o+=")"),s.length>3&&(o+=" "+s.slice(3,Math.min(6,s.length))),s.length>6&&(o+=" "+s.slice(6,Math.min(8,s.length))),s.length>8&&(o+=" "+s.slice(8,Math.min(10,s.length))),o}function Te(e){e&&(b(e.value)?e.value=_(e.value):e.value="+38 ",e.addEventListener("input",()=>{const t=b(e.value);e.value=_(t)}),e.addEventListener("focus",()=>{b(e.value)||(e.value="+38 ")}),e.addEventListener("blur",()=>{(e.value.trim()==="+38"||e.value.trim()==="+38("||b(e.value)==="38")&&(e.value="")}))}let A=null,B=null,m=null,h=null,oe=null;const Oe=()=>e=>{e.key==="Escape"&&I()},De=()=>e=>{(e.target===m||e.target===oe)&&I()},Ne=()=>{$||($=Oe()),x||(x=De()),document.addEventListener("keydown",$),m&&m.addEventListener("click",x)},Fe=()=>{$&&document.removeEventListener("keydown",$),x&&m&&m.removeEventListener("click",x)};function re(){m=document.getElementById("order-backdrop"),h=document.querySelector(".order-form"),oe=document.querySelector(".close-btn")}function Ue(e,t){m||re(),m&&(m.classList.remove("visuallyhidden"),document.body.style.overflow="hidden",A=e,B=t,Ne())}const I=()=>{m&&(m.classList.add("visuallyhidden"),document.body.style.overflow=""),h&&h.reset(),Fe()};function ze(e){return c(this,null,function*(){e.preventDefault();const t=new FormData(h),s=Object.fromEntries(t),o=h.querySelector(".submit-btn");o&&(o.disabled=!0);let r=!0;Ae.test(s.email)||(l.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"}),r=!1);const n=b(s.phone);if(Be.test(n)||(l.error({title:"Validation Error",message:"Please enter a valid phone number.",position:"topRight"}),r=!1),s.phone=n,(!s.comment||s.comment.trim()==="")&&(l.error({title:"Validation Error",message:"Please enter a comment.",position:"topRight"}),r=!1),(!A||!B)&&(l.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"}),r=!1),!r){o&&(o.disabled=!1);return}const i={email:s.email,phone:s.phone,comment:s.comment,modelId:A,color:B};try{(yield he(i))&&I()}catch(d){}finally{o&&(o.disabled=!1)}})}function K(){if(re(),h){P||(P=ze),h.addEventListener("submit",P);const e=h.querySelector('input[name="phone"]');Te(e)}}const G=document.querySelector(".close-btn");G&&G.addEventListener("click",I);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K):K();const ne="/project-nobug-nocry/images/sprite-CTbW2Ani.svg",E=document.querySelector(".modal-window"),Z=document.querySelector(".products-list");let T=0,O="",C=null,H=null,D=[];function We(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function je(e){const t=We(e),s=Math.floor(t),o=t%1!==0,r=5-Math.ceil(t);let n="";for(let i=0;i<s;i++)n+='<span class="star star-full">★</span>';o&&(n+='<span class="star star-half">★</span>');for(let i=0;i<r;i++)n+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${n}</div>`}const Ve=()=>e=>{e.key==="Escape"&&N()},_e=()=>e=>{const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");(!t||s)&&N()},Ke=()=>{C||(C=Ve()),H||(H=_e()),document.addEventListener("keydown",C),E.addEventListener("click",H)},Ge=()=>{C&&document.removeEventListener("keydown",C),H&&E.removeEventListener("click",H),D.forEach(({input:e,handler:t})=>{e.removeEventListener("change",t)}),D=[]};function N(){E.classList.add("visuallyhidden"),document.body.style.overflow="",Ge()}function Ze(){const e=document.querySelector(".modalButton");e&&e.addEventListener("click",function(){N(),Ue(T,O)})}function Xe(){return`
  <div class="product-modalWindow">
    <div class="modal-loading" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
      <div class="spinner" aria-label="Loading"></div>
    </div>
    <button type="button" class="modal-close-btn" >
      <svg class="close-icon" width="14" height="14">
        <use href="${ne}#icon-close"/>
      </svg>
    </button>
  </div>`}function F(e){return c(this,null,function*(){document.body.style.overflow="hidden",E.classList.remove("visuallyhidden"),E.innerHTML=Xe(),Ke(),T=e;const t=yield me(T),s=Ye(t);E.innerHTML=s;const o=document.querySelectorAll('input[name="furniture-color"]');o.length>0&&(o[0].checked=!0,O=o[0].value),o.forEach(r=>{const n=function(){O=this.value};r.addEventListener("change",n),D.push({input:r,handler:n})}),Ze()})}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;F(t)});Z&&Z.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");yield F(s)}}})});const X=document.querySelector(".popular-products-swiper");X&&X.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");yield F(s)}}})});function Ye(e){return`
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
          ${je(e.rate)}
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
        <p class="furnitureSize">Розміри: ${e.sizes}</p>
        <button class="modalButton">Перейти до замовлення</button>
      </div>
    </div>
    <button type="button" class="modal-close-btn" >
        <svg class="close-icon" width="14" height="14">
          <use href="${ne}#icon-close"/>
        </svg>
      </button>
  </div>`}});export default Je();
