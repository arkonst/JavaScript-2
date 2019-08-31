const goods = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
];

const renderGoodsItem = (img = 'img/no_image.png', title = 'Название товара', price = '0') => {
  return `<div class="goods-item">
              <img class="product-image" src="${img}" alt="Изображение товара" />              
              <h3 class="product-title">${title}</h3>
              <p class="product-price">${price}</p>
          </div>`;  
};

const renderGoodsList = (list) => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join(''); // Метод join() применяем для удаления запятых, появляющихся при переборе массива.
};


document.addEventListener('DOMContentLoaded', () => {
  renderGoodsList(goods);
});