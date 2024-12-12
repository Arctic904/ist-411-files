const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});


const userLoginSchema = new mongoose.Schema({
    username: String,
    password: String,
});


const shippingSchema = new mongoose.Schema({
    address: String,
    user: String,
    date: String,
});


const returnSchema = new mongoose.Schema({
    productId: String,
    user: String,
    date: String,
    reason: String,
});


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
});


const cartSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
    userId: String,
});


const billSchema = new mongoose.Schema({
    price: Number,
    quantity: Number,
    userId: String,
    address: String,
});
module.exports = {
    User: mongoose.model('User', userSchema),
    UserLogin: mongoose.model('UserLogin', userLoginSchema),
    Shipping: mongoose.model('Shipping', shippingSchema),
    Return: mongoose.model('Return', returnSchema),
    Product: mongoose.model('Product', productSchema),
    Cart: mongoose.model('Cart', cartSchema),
    Bill: mongoose.model('Bill', billSchema),
}