// Класс для корзины
class Cart {
  constructor() {
    this.goods = []; // массив товаров, добавленных в корзину
  }
  render() {} // Метод рендера содержис=мого корзины
  totalCartSum() {} // Метод вычисления общей стоимости товаров в корзине
  emptyCart() {} // Метода удаления всех товаров из корзины
}

// Класс элемента в корзине
class GoodInCart {
  constructor() {
    this.img = img;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }
  render() {} // Рендер товара в корзине
}



class GoodsItem {
  constructor(img = 'img/no_image.png', title = 'Название товара', price = 'Нет цены') {
    this.img = img;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><img class="product-image" src="${this.img}" alt="Изображение товара" /><h3 class="product-title">${this.title}</h3><p class="product-price">${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(container) {
    this.container = container;
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      {price: 150},
      {price: 250},
      {price: 350},
      {price: 450},
      {},
      {},
      {},
      {},
    ];
  }
  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.img, item.title, item.price);
      return acc += good.render();
    }, '');
  }
  calcTotalSum() {
    let totalSum = 0;
    this.goods.forEach((item) => {
        if(item.price !== undefined) {
            totalSum += item.price;          
        }
        return totalSum;
    });
    let totalSumOuter = "Всего товаров на сумму " + totalSum + " условных единиц";
    document.querySelector('.total-sum').innerHTML = totalSumOuter;
  }
}


const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();
list.calcTotalSum();




