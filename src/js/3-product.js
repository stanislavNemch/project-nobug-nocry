import {
  getFurnitures,
  getCategories,
  getFeedbacks,
  createOrder,
} from './furniture-api.js';

const listCategory = document.querySelector('.product-categories-list');

export function renderCategories(data) {
  const markup = data
    .map(
      el => `<li class="product-categories-item">
      ${el.name}
      </li>`
    )
    .join('');

  listCategory.innerHTML = markup;
}

async function getAllCategories() {
  try {
    const data = await getCategories();
    renderCategories([{ name: 'Всі товари' }, ...data]);
    console.log(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

// async function renderCategories() {
//   try {
//     const data = await listCategory();
//     const murkUp = data.map(elem => {
//       return elem;
//     });
//     console.log(murkUp);
//   } catch (error) {
//     console.log(error);
//   }
// }

getAllCategories();
