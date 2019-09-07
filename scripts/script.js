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
function addCart(id) {
  cart.addToCart(id);
};
// Функция для вызова удаления из корзины
function deleteItem(id) {
  cart.deleteFromCart(id);
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
    return `<div class="goods-item"><img class="product-image" src="${this.img}" alt="${this.title}" /><h3 class="product-title">${this.title}</h3><p class="product-price">${this.price}</p><button class="addClick" onclick="addCart(${this.id})">Добавить</button></div>`;
  }
}

// Класс списка товаров
class GoodsList {
  constructor(container) {
    this.container = container;
    this.goods = [];
  }
  fetchGoods(url) {
    makeGETRequest(`response.json`, (item) => {
      this.goods = JSON.parse(item);
      this.render();
      this.calcTotalSum();
  })
  }
  render() {
    let goodsToShow = '';
    this.goods.forEach((item) => {
        const goodItem = new GoodsItem(item.id, item.img, item.title, item.price);
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

// Класс элемента в корзине
class GoodInCart extends GoodsItem {
  constructor(id, img, title, price, count = 1) {    
    super(id, img, title, price);
    this.count = count;    
  }
  // Рендер товара в корзине
  render() {
    return `<div class="cart-item">    
    <span class="cart-item-title">${this.title}</span>
    <span class="cart-item-price">${this.price}</span>
	<span class="cart-item-count">${this.count}</span>
    <button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
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
      const goodItem = new GoodInCart(item.id, item.img, item.title, item.price);
      cartContents += goodItem.render();
  })
  document.querySelector('.goods-list').innerHTML = cartContents;
  this.calcCartSum();
  }
}



const list = new GoodsList('.goods-list');
const cart = new Cart();
list.fetchGoods('response.json');
list.render();





