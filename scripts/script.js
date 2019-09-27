Vue.component('goods-item', {
    props: ['good'],  
    methods: {
        add() {
          this.$emit('add', this.good);
        }
      },  
    template: `    
        <div class="goods-item card">
            <div class="card-body">
                <img class="product-image"  :src="good.img" :alt="good.title">
                <h3 class="card-title">{{ good.title }}</h3>
                <p>{{good.price}}</p>
                <button class="btn btn-primary" @click="add">Добавить</button>
            </div> 
        </div>   
    `,

});

Vue.component('goods-list', {
    props: ['goods'],
    computed: {
        isGoodsNotEmpty() {
            return this.goods.length > 0;
        }
    },
    methods: {
        addTo(productId) {
          this.$emit('add', productId)
        }
      },
    template: `    
        <div class="goods-list" v-if="isGoodsNotEmpty">
            <goods-item v-for="good in goods" @add="addTo" :good="good" :key="good.id"></goods-item>
        </div> 
        <div class="goods-empty" v-else >
            <h3 class="goods-null">
            Нет данных / Товары не найдены
            </h3>
        </div>         
    `
});

Vue.component('search', {
    props: ['value'],
    computed:  {
        searchQuery: {
            get() {
                return this.value;
            },
            set(newQuery) {
                this.$emit('input', newQuery);
            }
        }
    },
    template: `
    <div class="search">
        <form class="goods-search-from" @submit.prevent>
            <input type="search" class="goods-search" v-model.trim="searchQuery"/>
        </form>
    </div>      
    `
});

Vue.component('cart', {
    props: ['goods'],
    data: () => ({
        isVisibleCart: false,
    }),
    methods: {
        viewCart() {
            this.isVisibleCart = !this.isVisibleCart;            
        }
    },    
    created() {
        this.$emit('fetch');
    },
    template: `
    <div class="cart">
        <button class="cart-button  btn btn-primary" @click="viewCart">Корзина<span class="badge badge-light"></span></button>
        <transition name="fade">
            <aside class="basket-list flex-column" v-if="isVisibleCart">
                <h4>Корзина</h4>
                    <div class="basket-item d-flex flex-row"  v-for="(good, id) in goods">
                        <img :src="good.img" :alt="good.title">
                        <h6>{{good.title}}</h6>
                        <p class="h6">{{good.price}}</p>
                        <p class="h6">{{ good.count }}</p>
                        <button class="btn btn-secondary" @click="$emit('remove', id)">&times;</button>
                    </div>
                           
            </aside> 
        </transition>
    </div>
    `
});

Vue.component('notification', {
    props: ['error', 'level'],
    computed: {
        errorMess() {
            return this.error.message ? this.error.message : this.error;
        },
        top() {
            return `${(this.level + 1)*20}px`;
        }
    },
    template: `
    <div class="notification notification--error" :style="{top: top}">
        {{ errorMess }}
    </div>
    `

});


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        searchLine: '',
        totalPriceMessage: '',
        totalPriceCoin: '',
        errors: [''],
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            return this.goods.filter((good) => {
                return regexp.test(good.title);
            });
        },
    },
    mounted() {
        this.makeGETRequest('/catalogData').then((goods) => {
            this.goods = goods;
            console.log(goods);
        }).catch(err => this.addError(err));
    },
    methods: {
        addError(error) {
            this.errors.push(error);
            setTimeout(() => {
                const index = this.errors.indexOf(error);
                if (index > -1) this.errors.splice(index, 1);
            }, 3000);
        },
        async addToCart(product) {
            try {
                this.basketGoods = await this.makePOSTRequest('/addToCart', product);
            } catch (err) {
                this.addError(err)
            }      
                        
        },
        async removeGoodFromCart(id) {
            try {
                this.basketGoods = await this.makeDELETERequest(`/cart/${id}`);
            } catch (err) {
                this.addError(err)
            }            
        },
        async getCart() {
            try {
                this.basketGoods = await this.makeGETRequest('/cart');
            } catch (err) {
                this.addError(err)
            }
           
        },
                
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (xhr.status !== 200) reject(response);
                            resolve(response);
                        } catch(e) {
                            reject(e);
                        }
                    }
                };

                xhr.onerror = function (e) {
                    reject(e);
                };

                xhr.open('GET', url);
                xhr.send();
            });
        },

        makePOSTRequest(url, data) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (xhr.status !== 200) reject(response);
                            resolve(response);
                        } catch(e) {
                            reject(e);
                        }
                    }
                };

                xhr.onerror = function (e) {
                    reject(e);
                };

                xhr.open('POST', url);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                xhr.send(JSON.stringify(data));
            });
        },
        makeDELETERequest(url, data) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (xhr.status !== 200) reject(response);
                            resolve(response);
                        } catch(e) {
                            reject(e);
                        }
                    }
                };

                xhr.onerror = function (e) {
                    reject(e);
                };

                xhr.open('DELETE', url);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                xhr.send(JSON.stringify(data));
            });
        }
    }
});


