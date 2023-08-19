const request=require("supertest")
const app=require('../app')
const Product = require("../models/Product")
const Cart = require("../models/Cart")
require('../models')
const URL_BASE='/api/v1/purchase'
const URL_BASE_USER='/api/v1/users/login'

let TOKEN
let userId
let productBody
let product
let bodyCart

beforeAll(async()=>{
    const user={
        email:'kycaquimbo',
        password:'karla123'
    }

    const res=await request(app)
    .post(URL_BASE_USER)
    .send(user)

    TOKEN=res.body.token
    userId=res.body.user.id
    
    //PRODUCT
    // productBody={
    //     title:'Xiaomi',
    //     description:'celular de ram',
    //     price:200.23
        
    // }
    // product=await Product.create(productBody)

    //CART 
    // bodyCart={
    //     quantity:1,
    //     productId:product.id
        
    // }

    // await Cart.create(bodyCart)

     
})

// test("POST-> 'URL_BASE', shouldd returnstatus code 201 and res.body.quantity===bodyCart.quantity", async() => { 

//     const res=await request(app)
//     .post(URL_BASE)
//     .set('Authorization',`Bearer ${TOKEN}`)

//     expect(res.status).toBe(201)
//    //expect(res.body.quantity).toBe(bodyCart.quantity)
//  })