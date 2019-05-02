const swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        const {id} = req.params;
        const index = req.session.user.cart.findIndex(item => item.id == id)
        if (index === -1) {
            const item = swag.find(swag => swag.id == id)
            req.session.user.cart.push(item);
            req.session.user.total += item.price
        }
        res.status(200).send(req.session.user)
    },
    delete: (req, res) => {
        const {id} = req.params;

        const index = req.session.user.cart.findIndex(item => item.id == id)

        req.session.user.total -= req.session.user.cart[index].price

        req.session.user.cart.splice(index, 1)
        
        res.status(200).send(req.session.user)
    },
    checkout: (req, res) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user)
    }
}