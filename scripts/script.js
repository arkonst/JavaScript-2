const BASE_URL = 'https://github.com/arkonst/JavaScript-2/blob/Lesson-3';


// Функция запроса / ответа на промисах
function makeGETRequest(url, callback) {
  return new Promise((resolve, reject) => {
      let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
      xhr.open("GET", url, true);
      xhr.onload = () => resolve(callback(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
}


// Функция для вызова добавления в корзину
function addBasket(id) {
  cart.addToBasket(id);
};
// Функция для вызова удаления из корзины
function deleteItem(id) {
  cart.deleteFromBasket(id);
};
// Функция для вызова рендера корзины
function viewCart() {
  cart.render();
};

// Класс товара
class GoodsItem {
  constructor(id, img = 'img/no_image.png', title = 'Название товара', price = 'Нет цены') {
    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><img class="product-image" src="${this.img}" alt="${this.title}" /><h3 class="product-title">${this.title}</h3><p class="product-price">${this.price}</p><button class="addClick" onclick="addBasket(${this.id})">Добавить</button></div>`;
  }
}

// Класс списка товаров
class GoodsList {
  constructor(container) {
    this.container = container;
    this.goods = [];
  }
  fetchGoods(url) {
    makeGETRequest(`${BASE_URL}/response.json`, (item) => {
      this.goods = JSON.parse(item);
      this.render();
      this.calcTotalSum();
  })
  }
  render() {
    let goodsToShow = '';
    this.goods.forEach((item) => {
        const goodItem = new GoodItem(item.id, item.title, item.price, item.img);
        goodsToShow += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = goodsToShow;
}
  calcTotalSum() {
    let totalSum = 0;
    this.goods.forEach((item) => {
        if(item.price !== undefined) {
            totalSum += item.price;          
        }
        return totalSum;
    });    
  }
}


// Класс для корзины
class Cart extends GoodsList {
  
  // Добавление товара в корзину (привязываем на нажатие кнопки)
  addToCart(id) {
    let toCart;
    list.goods.forEach(function(item) {
        if(id == item.id) {
            toCart = {               
                title: item.title,
                price: item.price,                
            }
        }
    });
    this.goods.push(toCart);    
}

// Удаление товара из корзины (привязываем на нажатие кнопки)
deleteFromCart(id) {
    let getIdElemen;
    this.goods.forEach(function(item, i) {
        let thisId = item.id;
        if(id == thisId) {
            getIdElemen = i;
        }        
    });
    this.goods.splice(getIdElemen, 1);
    this.render();    
}

// Считаем стоимость товаров в корзине
calcCartSum() {
    let totalPrice = 0;
    this.goods.forEach((item) => {
        if (item.price !== undefined) {
            totalPrice += item.price;
        }
    });
    let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
}
 // Рендер содержимого корзины
 render() {
  let cartContents = '';
  this.goods.forEach((item) => {
      const goodItem = new CartItem(item.title, item.price);
      cartContents += goodItem.render();
  })
  document.querySelector('.goods-list').innerHTML = cartContents;
  this.calcCartSum();
  }
}

// Класс элемента в корзине
class GoodInCart extends GoodsItem {
  constructor(title = 'Название товара', price = 'Нет цены', count = 1) {    
    super(title, price);
    this.count = count;    
  }
  // Рендер товара в корзине
  render() {
    return `<div class="basket-item">
    <span class="cart-item-title">${this.title}</span>
    <span class="cart-item-price">${this.price}</span>
    <button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
} 
}


const list = new GoodsList('.goods-list');
list.fetchGoods('response.json');
list.render();





