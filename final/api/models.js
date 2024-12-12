const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

export const User = mongoose.model('User', userSchema);

const userLoginSchema = new mongoose.Schema({
    username: String,
    password: String,
});

export const UserLogin = mongoose.model('UserLogin', userLoginSchema);

const shippingSchema = new mongoose.Schema({
    address: String,
    user: String,
    date: String,
});

export const Shipping = mongoose.model('Shipping', shippingSchema);

const returnSchema = new mongoose.Schema({
    productId: String,
    user: String,
    date: String,
    reason: String,
});

export const Return = mongoose.model('Return', returnSchema);

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
});

export const Product = mongoose.model('Product', productSchema);

const cartSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
    userId: String,
});

export const Cart = mongoose.model('Cart', cartSchema);

const billSchema = new mongoose.Schema({
    price: Number,
    quantity: Number,
    userId: String,
    address: String,
});

export const Bill = mongoose.model('Bill', billSchema);