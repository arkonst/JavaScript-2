const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('server is running');
});

const ACTION_TYPES = {
    add: 'add',
    remove: 'remove'
};
const saveStats = (action, payload) => {
    fs.readFile('stats.json', 'utf-8', (err, data) => {
        const stats = JSON.parse(data);
        const item = {
            action,
            date: +new Date(),
            payload
        };  
        stats.push(item);             
        fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
            if (err) {
                console.error(err);
                }
            }
        )
    })
};


app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});
app.get('/cart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});
app.delete('/cart/:id', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const id  = req.params.id;
        const productId = cart[id].id;

        cart.splice(id, 1);
        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                res.send(JSON.stringify({
                    result: 0
                }))
            } else {
                saveStats(ACTION_TYPES.remove, {
                    productId
                });
                res.send(JSON.stringify(cart))
            }
        });
       
    });
});
app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;

        const goodIndex = cart.findIndex(cartItem => cartItem.id == item.id);
        if (goodIndex > -1) {
            cart[goodIndex].count += 1;
        } else {
            cart.push({
                ...item,
                count: 1
            });
        };        
        fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                res.send(JSON.stringify({
                    result: 0
                }))
            } else {
                saveStats(ACTION_TYPES.add, {
                    productId: item.id
                });
                res.send(JSON.stringify(cart))
            }
        });
    });
});