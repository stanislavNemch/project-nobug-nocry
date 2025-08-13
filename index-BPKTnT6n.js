var de=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var c=(e,t,s)=>new Promise((n,o)=>{var r=u=>{try{d(s.next(u))}catch(v){o(v)}},i=u=>{try{d(s.throw(u))}catch(v){o(v)}},d=u=>u.done?n(u.value):Promise.resolve(u.value).then(r,i);d((s=s.apply(e,t)).next())});import{a as ue}from"./api-CGQni89X.js";import{i as l}from"./toast-CnhFlkt1.js";import{S as Y,N as J,P as Q}from"./swiper-BdJhUY6v.js";import"./accordion-n9T1KWKK.js";/* empty css               */var Qe=de(R=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const pe="https://furniture-store.b.goit.study/api",S={FURNITURES:"/furnitures",CATEGORIES:"/categories",ORDERS:"/orders",FEEDBACKS:"/feedbacks"},M=ue.create({baseURL:pe,headers:{"Content-Type":"application/json"}});function y(e=1,t=10,s){return c(this,null,function*(){try{return(yield M.get(S.FURNITURES,{params:{page:e,limit:t,category:s}})).data}catch(n){return l.error({title:"Помилка",message:"Не вдалося завантажити меблі. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}function me(e){return c(this,null,function*(){try{let t=1;const s=30;let n=0,o=0;do{const i=(yield M.get(S.FURNITURES,{params:{page:t,limit:s}})).data,d=i.furnitures||i;t===1&&(n=i.totalItems||0,o=Math.ceil(n/s));const u=d.find(v=>v._id===e);if(u)return u;t++}while(t<=o);return l.warning({title:"Увага",message:"Товар з таким ID не знайдено.",position:"topRight",timeout:4e3}),null}catch(t){return l.error({title:"Помилка",message:"Не вдалося завантажити інформацію про товар.",position:"topRight",timeout:4e3}),null}})}function ge(){return c(this,null,function*(){try{return(yield M.get(S.CATEGORIES)).data}catch(e){return l.error({title:"Помилка",message:"Не вдалося завантажити категорії. Перевірте підключення до інтернету.",position:"topRight",timeout:4e3}),null}})}function fe(e=1,t=10){return c(this,null,function*(){try{return(yield M.get(S.FEEDBACKS,{params:{page:e,limit:t}})).data}catch(s){return l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3}),null}})}function he(e){return c(this,null,function*(){try{const t=yield M.post(S.ORDERS,e);return l.success({title:"Успіх!",message:"Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",position:"topRight",timeout:4e3}),t.data}catch(t){return l.error({title:"Помилка замовлення",message:"Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.",position:"topRight",timeout:4e3}),null}})}function ve(){return c(this,null,function*(){try{return(yield M.get(S.FURNITURES,{params:{type:"popular"}})).data}catch(e){return l.error({title:"Помилка",message:"Не вдалося завантажити популярні товари. Спробуйте пізніше.",position:"topRight",timeout:4e3}),null}})}(()=>{const e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),s=t.querySelector("use"),n=e.querySelectorAll(".nav-link, .mobile-order-btn");let o=null,r=null;const i=()=>s.getAttribute("href").split("#")[0],d=()=>p=>{p.key==="Escape"&&$()},u=()=>p=>{const ce=e.contains(p.target),le=t.contains(p.target);!ce&&!le&&$()},v=()=>{o||(o=d()),r||(r=u()),document.addEventListener("keydown",o),document.addEventListener("click",r)},z=()=>{o&&document.removeEventListener("keydown",o),r&&document.removeEventListener("click",r)},$=()=>{const p=i();e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),s.setAttribute("href",`${p}#icon-burger`),t.setAttribute("aria-label","Перемикач мобільного меню"),document.body.classList.remove("no-scroll"),z()},ie=()=>{const p=i();e.classList.add("is-open"),t.setAttribute("aria-expanded",!0),s.setAttribute("href",`${p}#icon-close`),t.setAttribute("aria-label","Закрити мобільне меню"),document.body.classList.add("no-scroll"),v()},ae=()=>{e.classList.contains("is-open")?$():ie()};t.addEventListener("click",ae),n.forEach(p=>{p.addEventListener("click",()=>{e.classList.contains("is-open")&&$()})});const j=window.matchMedia("(min-width: 1440px)"),W=p=>{p.matches&&e.classList.contains("is-open")&&$()};j.addEventListener("change",W),window.addEventListener("beforeunload",()=>{z(),j.removeEventListener("change",W)})})();const ee=document.querySelector(".product-categories-list"),g=document.querySelector(".pagination"),A=document.querySelector(".btn-loadMore"),te="Всі товари";let a=1,f=1,E=null;function ye(){const e=document.querySelector(".product-categories-content");e&&e.classList.add("active-category")}function we(e){e.target.closest(".product-categories-content").classList.add("active-category")}function be(){const e=document.querySelector(".active-category");e&&e.classList.remove("active-category")}function Le(e){const t=e.map((s,n)=>`<li class="product-categories-item" data-id="${s._id}">
  <img
    class="product-categories-img"
    srcset="
      ./img/category-imgs/category-img-${n+1}.webp    1x,
      ./img/category-imgs/category-img-${n+1}@2x.webp 2x
    "
    src="./img/category-imgs/category-img-${n+1}.webp"
    alt="Зображення категорії ${s.name}"
  />
  <div class="product-categories-content">
    <p class="product-categories-descr">${s.name}</p>
  </div>
</li>`).join("");ee.innerHTML=t}function Ee(){return c(this,null,function*(){try{const e=yield ge();Le([{name:te,_id:"78fa12bc34de56f7890a1b35"},...e]),ye()}catch(e){return[]}})}function Se(e){const t=e.target.closest(".product-categories-item");if(!t)return;const s=t.textContent.trim(),n=t.dataset.id;a=1,be(),we(e),s===te?(E=null,w(y(1,8))):(E=n,w(y(1,8,n)))}ee.addEventListener("click",Se);function Me(e=8){const t=document.querySelector(".products-list");t.innerHTML="";for(let s=0;s<e;s++){const n=document.createElement("div");n.className="product-item skeleton",n.innerHTML=`
      <div class="skeleton-box" style="width:100%; height:256px; margin-bottom:10px;"></div>
      <div class="skeleton-box" style="width:80%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:60%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:40%; height:16px; margin-bottom:12px;"></div>
      <button class="btn btn-go-modal">Детальніше</button>
    `,t.appendChild(n)}}function w(){return c(this,arguments,function*(e=y(a,8)){const t=document.querySelector(".products-list"),s=window.matchMedia("(max-width: 767px)").matches,n=t.querySelectorAll(".product-item").length;(!s||a===1)&&Me(8),ke();try{const o=yield e,r=o.furnitures||o;if(f=Math.ceil(o.totalItems/8),s&&a>1){r.forEach(d=>{t.appendChild(V(d))});const i=t.querySelectorAll(".product-item")[n];i&&i.scrollIntoView({behavior:"smooth",block:"start"})}else t.innerHTML="",r.forEach(i=>{t.appendChild(V(i))});s?se():($e(a),Ce())}catch(o){t.innerHTML="<p>Помилка завантаження товарів.</p>"}finally{xe()}})}function V(e){const t=document.createElement("li");return t.className="product-item",t.setAttribute("data-id",e._id),t.innerHTML=`
    <img src="${e.images[0]}" alt="${e.name}" class="img-card" width="100%" height="256px" />
    <p class="text-card">${e.name}</p>
    <div class="colors">
      ${e.color.map(s=>`<span class="color-one" style="background-color:${s};"></span>`).join("")}
    </div>
    <p class="text-card">${e.price} грн</p>
    <button class="btn btn-go-modal">Детальніше</button>
  `,t}function $e(e){g.innerHTML="",g.innerHTML+=`
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
  `}function ke(){document.querySelector(".loader").classList.remove("visuallyhidden")}function xe(){document.querySelector(".loader").classList.add("visuallyhidden")}function Ce(){const e=document.querySelector(".btn-prev"),t=document.querySelector(".btn-next");a===1?e.classList.add("disabled"):e.classList.remove("disabled"),a>=f?t.classList.add("disabled"):t.classList.remove("disabled")}function se(){a>=f?A.style.display="none":A.style.display="inline"}document.addEventListener("click",e=>c(R,null,function*(){if(e.target.closest(".page-number")){const t=e.target.closest(".page-number"),s=parseInt(t.textContent,10);isNaN(s)||(a=s,yield w(y(a,8,E)))}e.target.closest(".btn-next")&&a<f&&(a++,yield w(y(a,8,E))),e.target.closest(".btn-prev")&&a>1&&(a--,yield w(y(a,8,E)))}));A.addEventListener("click",()=>c(R,null,function*(){a<f&&(a++,se(),yield w(y(a,8,E)))}));document.addEventListener("DOMContentLoaded",()=>{Ee(),w()});class qe{constructor(){this.swiperContainer=document.querySelector(".popular-products-swiper"),this.swiperWrapper=document.querySelector(".popular-products-swiper .swiper-wrapper"),this.loader=document.querySelector(".popular-products-loader"),this.swiper=null,this.products=[],this.init()}init(){return c(this,null,function*(){yield this.loadProducts(),this.products.length>=3&&(this.renderProducts(),this.initSwiper())})}loadProducts(){return c(this,null,function*(){this.showLoader();try{const t=yield ve();t&&t.furnitures&&t.furnitures.length>=3?this.products=t.furnitures:this.showError("Недостатньо популярних товарів для відображення")}catch(t){this.showError("Помилка завантаження популярних товарів")}finally{this.hideLoader()}})}renderProducts(){const t=this.products.map(s=>`
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${s._id}">
          <img src="${s.images[0]}" alt="${s.name}" class="img-card" />
          <p class="text-card">${s.name}</p>
          <div class="colors">
            ${s.color.map(n=>`<span class="color-one" style="background-color:${n};"></span>`).join("")}
          </div>
          <p class="text-card">${s.price} грн</p>
          <div class="product-bottom">
            <button class="btn btn-go-modal">Детальніше</button>
          </div>
        </div>
      </div>
    `).join("");this.swiperWrapper.innerHTML=t}initSwiper(){this.swiper=new Y(".popular-products-swiper",{modules:[J,Q],slidesPerView:1,spaceBetween:16,centeredSlides:!0,breakpoints:{768:{slidesPerView:2,spaceBetween:24,centeredSlides:!1},1440:{slidesPerView:4,spaceBetween:24,centeredSlides:!1}},navigation:{nextEl:".popular-products-navigation .swiper-button-next",prevEl:".popular-products-navigation .swiper-button-prev"},pagination:{el:".popular-products-pagination",clickable:!0,type:"bullets",renderBullet:function(t,s){return'<span class="'+s+'"></span>'}},loop:!1,watchOverflow:!0,watchSlidesProgress:!0,speed:300,autoplay:!1,touchRatio:1,touchAngle:45,grabCursor:!0,updateOnWindowResize:!0,on:{init:()=>{this.addCustomIcons()},slideChange:()=>{}}}),this.bindEvents()}bindEvents(){this.swiperWrapper.addEventListener("click",t=>{const s=t.target.closest(".popular-products-item");if(s&&t.target.classList.contains("btn-go-modal")){const n=s.dataset.id;this.openProductModal(n)}}),window.addEventListener("resize",()=>{setTimeout(()=>{this.swiper&&this.swiper.update()},100)})}addCustomIcons(){setTimeout(()=>{const t=document.querySelector(".popular-products-navigation .swiper-button-prev"),s=document.querySelector(".popular-products-navigation .swiper-button-next");t&&!t.querySelector(".popular-products-icon")&&(t.innerHTML=`
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
    `}slideNext(){this.swiper&&this.swiper.slideNext()}slidePrev(){this.swiper&&this.swiper.slidePrev()}destroy(){this.swiper&&(this.swiper.destroy(!0,!0),this.swiper=null)}}document.addEventListener("DOMContentLoaded",()=>{new qe});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".faq-question").forEach(e=>{e.addEventListener("click",()=>{const t=e.nextElementSibling,s=e.querySelector("use");if(t.classList.contains("open")){if(t.classList.remove("open"),s){const o=s.getAttribute("href");if(o){const r=o.split("#")[0];s.setAttribute("href",`${r}#chevron-down`)}}}else if(document.querySelectorAll(".faq-question").forEach(o=>{if(o!==e){const r=o.nextElementSibling,i=o.querySelector("use");if(r.classList.contains("open")&&(r.classList.remove("open"),i)){const d=i.getAttribute("href");if(d){const u=d.split("#")[0];i.setAttribute("href",`${u}#chevron-down`)}}}}),t.classList.add("open"),s){const o=s.getAttribute("href");if(o){const r=o.split("#")[0];s.setAttribute("href",`${r}#chevron-up`)}}})})});function He(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function Ie(e){const t=He(e),s=Math.floor(t),n=t%1!==0,o=5-Math.ceil(t);let r="";for(let i=0;i<s;i++)r+='<span class="star star-full">★</span>';n&&(r+='<span class="star star-half">★</span>');for(let i=0;i<o;i++)r+='<span class="star star-empty">★</span>';return`<div class="rating-stars" data-rating="${t}">${r}</div>`}document.addEventListener("DOMContentLoaded",()=>c(R,null,function*(){try{const e=yield fe(1,10);if(!e||!Array.isArray(e.feedbacks)||e.feedbacks.length===0){l.warning({title:"Увага",message:"Відгуки відсутні або дані некоректні.",position:"topRight",timeout:4e3});return}Re(e.feedbacks),Pe()}catch(e){l.error({title:"Помилка",message:"Не вдалося завантажити відгуки. Спробуйте оновити сторінку.",position:"topRight",timeout:4e3})}}));function Re(e){const t=document.querySelector(".reviews .swiper-wrapper");if(!t){l.error({title:"Помилка",message:"Контейнер для відгуків не знайдено.",position:"topRight",timeout:4e3});return}const s=e.map(n=>`
        <div class="swiper-slide">
            <div class="review-card">
                ${Ie(n.rate)}
                <p class="review-text">"${n.descr}"</p>
                <h3 class="reviewer-name">${n.name}</h3>
            </div>
        </div>
    `).join("");t.innerHTML=s}function Pe(){try{if(!document.querySelector(".reviews .swiper")){l.error({title:"Помилка",message:"Елемент слайдера відгуків не знайдено.",position:"topRight",timeout:4e3});return}const t=new Y(".reviews .swiper",{modules:[J,Q],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1440:{slidesPerView:3,spaceBetween:20}},on:{init:function(){_(this)},slideChange:function(){_(this)}}})}catch(e){l.error({title:"Помилка",message:"Не вдалося ініціалізувати слайдер відгуків.",position:"topRight",timeout:4e3})}}function _(e){const t=document.querySelector(".reviews .swiper-button-prev"),s=document.querySelector(".reviews .swiper-button-next");t&&t.classList.toggle("swiper-button-disabled",e.isBeginning),s&&s.classList.toggle("swiper-button-disabled",e.isEnd)}const Ae=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,Te=/^[0-9]{12}$/;let k=null,x=null,P=null,T=null,O=null,m=null,h=null,oe=null;function L(e){return(e||"").replace(/\D/g,"")}function K(e){let t=L(e);t.startsWith("38")||(t="38"+t),t=t.slice(0,12);const s=t.slice(2);let n="+38";return s.length>0&&(n+=" ("+s.slice(0,Math.min(3,s.length))),s.length>=3&&(n+=")"),s.length>3&&(n+=" "+s.slice(3,Math.min(6,s.length))),s.length>6&&(n+=" "+s.slice(6,Math.min(8,s.length))),s.length>8&&(n+=" "+s.slice(8,Math.min(10,s.length))),n}function Oe(e){e&&(L(e.value)?e.value=K(e.value):e.value="+38 ",e.addEventListener("input",()=>{const t=L(e.value);e.value=K(t)}),e.addEventListener("focus",()=>{L(e.value)||(e.value="+38 ")}),e.addEventListener("blur",()=>{(e.value.trim()==="+38"||e.value.trim()==="+38("||L(e.value)==="38")&&(e.value="")}))}const Be=()=>e=>{e.key==="Escape"&&I()},De=()=>e=>{(e.target===m||e.target===oe)&&I()},Ne=()=>{k||(k=Be()),x||(x=De()),document.addEventListener("keydown",k),m&&m.addEventListener("click",x)},Fe=()=>{k&&document.removeEventListener("keydown",k),x&&m&&m.removeEventListener("click",x)};function ne(){m=document.getElementById("order-backdrop"),h=document.querySelector(".order-form"),oe=document.querySelector(".close-btn")}function Ue(e,t){m||ne(),m&&(m.classList.remove("visuallyhidden"),document.body.style.overflow="hidden",T=e,O=t,Ne())}const I=()=>{m&&(m.classList.add("visuallyhidden"),document.body.style.overflow=""),h&&h.reset(),Fe()};function ze(e){return c(this,null,function*(){e.preventDefault();const t=new FormData(h),s=Object.fromEntries(t),n=h.querySelector(".submit-btn");let o=!0;Ae.test(s.email)||(l.error({title:"Validation Error",message:"Please enter a valid E-mail address.",position:"topRight"}),o=!1);const r=L(s.phone);if(Te.test(r)||(l.error({title:"Validation Error",message:"Please enter a valid phone number (12 digits).",position:"topRight"}),o=!1),s.phone=r,(!s.comment||s.comment.trim().length<3)&&(l.error({title:"Validation Error",message:"Please enter a comment with at least 3 characters.",position:"topRight"}),o=!1),(!T||!O)&&(l.error({title:"Error",message:"Could not get furniture details. Please try again.",position:"topRight"}),o=!1),!o){n&&(n.disabled=!1);return}n&&(n.disabled=!0);const i={email:s.email,phone:s.phone,comment:s.comment,modelId:T,color:O};try{(yield he(i))&&I()}catch(d){}finally{n&&(n.disabled=!1)}})}function G(){if(ne(),h){P||(P=ze),h.addEventListener("submit",P);const t=h.querySelector('input[name="phone"]');Oe(t)}const e=document.querySelector(".close-btn");e&&e.addEventListener("click",I)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",G):G();const re="/project-nobug-nocry/images/sprite-CTbW2Ani.svg",H=document.querySelector(".modal-window"),b=H.querySelector(".container"),Z=document.querySelector(".products-list");let B=0,D="",C=null,q=null,N=[];function je(e){return e>=3.3&&e<=3.7?3.5:e>=3.8&&e<=4.2?4:Math.round(e*2)/2}function We(e){const t=je(e),s=Math.floor(t),n=t%1!==0,o=5-Math.ceil(t);let r="";for(let i=0;i<s;i++)r+='<span class="star star-full">★</span>';n&&(r+='<span class="star star-half">★</span>');for(let i=0;i<o;i++)r+='<span class="star star-empty">★</span>';return`<div class="modal-rating-stars" data-rating="${t}">${r}</div>`}const Ve=()=>e=>{e.key==="Escape"&&F()},_e=()=>e=>{const t=e.target.closest(".product-modalWindow"),s=e.target.closest(".modal-close-btn");(!t||s)&&F()},Ke=()=>{C||(C=Ve()),q||(q=_e()),document.addEventListener("keydown",C),H.addEventListener("click",q)},Ge=()=>{C&&document.removeEventListener("keydown",C),q&&H.removeEventListener("click",q),N.forEach(({input:e,handler:t})=>{e.removeEventListener("change",t)}),N=[]};function F(){H.classList.add("visuallyhidden"),document.body.classList.remove("modal-open"),Ge()}function Ze(){const e=b.querySelector(".modalButton");e&&e.addEventListener("click",function(){F(),Ue(B,D)})}function Xe(){return`
  <div class="product-modalWindow">
    <div class="modal-loading" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
      <div class="spinner" aria-label="Loading"></div>
    </div>
    <button type="button" class="modal-close-btn" >
      <svg class="close-icon" width="14" height="14">
        <use href="${re}#icon-close"/>
      </svg>
    </button>
  </div>`}function U(e){return c(this,null,function*(){document.body.classList.add("modal-open"),H.classList.remove("visuallyhidden"),b.innerHTML=Xe(),Ke(),B=e;const t=yield me(B);b.innerHTML=Je(t);const s=b.querySelectorAll('input[name="furniture-color"]');s.length>0&&(s[0].checked=!0,D=s[0].value),s.forEach(n=>{const o=function(){D=this.value};n.addEventListener("change",o),N.push({input:n,handler:o})}),Ze(),Ye()})}function Ye(){const e=b.querySelector(".modal-image-0"),t=b.querySelector(".modal-image-1"),s=b.querySelector(".modal-image-2");if(!e||!t||!s)return;function n(o,r){o.style.opacity="0.5",setTimeout(()=>{const i=o.src,d=o.alt;o.src=r.src,o.alt=r.alt,r.src=i,r.alt=d,o.style.opacity="1"},150)}t.addEventListener("click",()=>n(e,t)),s.addEventListener("click",()=>n(e,s))}document.addEventListener("openProductModal",function(e){const t=e.detail.productId;U(t)});Z&&Z.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img, button")){const t=e.target.closest(".product-item");if(t){const s=t.getAttribute("data-id");yield U(s)}}})});const X=document.querySelector(".popular-products-swiper");X&&X.addEventListener("click",function(e){return c(this,null,function*(){if(e.target.matches("img.img-card, button.btn-go-modal")){const t=e.target.closest(".popular-products-item");if(t){const s=t.getAttribute("data-id");yield U(s)}}})});function Je(e){var n;const s=(Array.isArray(e.color)?e.color:[]).map((o,r)=>`
      <div class="radio-wrapper">
        <input type="radio" id="color${r+1}" name="furniture-color" value="${o}" class="color-radio" />
        <label for="color${r+1}" class="color-circle" style="background-color: ${o}"></label>
      </div>
    `).join("");return`
  <div class="product-modalWindow">
    <div class="modal-left">
      <img class="modal-image-0" src="${e.images[0]}" alt="${e.description}" />
      <div class="modal-bottom-row">
        ${e.images[1]?`<img class="modal-image-1" src="${e.images[1]}" alt="${e.description}" />`:""}
        ${e.images[2]?`<img class="modal-image-2" src="${e.images[2]}" alt="${e.description}" />`:""}
      </div>
    </div>
    <div class="modal-right">
      <h2 class="product-modal-title">${e.name}</h2>
      <p class="modal-description">${((n=e.category)==null?void 0:n.name)||""}</p>
      <div class="description-container">
        <div class="modal-price-rating">
          <h3 class="modal-price">${e.price} грн</h3>
        </div>
        ${We(e.rate)}
        <div class="color-options">
          <p class="color-label">Колір</p>
          <div class="radio-group">
            ${s}
          </div>
        </div>
        <p class="furnitureDescription">${e.description}</p>
        <p class="furnitureSize">Розміри: ${e.sizes}</p>
        <button class="modalButton">Перейти до замовлення</button>
      </div>
    </div>
    <button type="button" class="modal-close-btn" >
        <svg class="close-icon" width="14" height="14">
          <use href="${re}#icon-close"/>
        </svg>
      </button>
  </div>`}});export default Qe();
