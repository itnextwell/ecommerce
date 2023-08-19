const request=require("supertest")
const app=require('../app')
const Category = require("../models/Category")

require('../models')

const URL_BASE='/api/v1/products'
const URL_BASE_USER='/api/v1/users/login'

let TOKEN
let product
let category
let productId
beforeAll(async()=>{
    const user={
        email:'kycaquimbo',
        password:'karla123'
    }

    const res=await request(app)
    .post(URL_BASE_USER)
    .send(user)

    TOKEN=res.body.token
     const categoryBody={
        name:'Phone'
     }

     category= await Category.create(categoryBody)
    
    
     product={
        title:'Xiaomi',
        description:'celular de ram',
        price:200.23,
        categoryId:category.id
    }
})



test("POST-> 'URL_BASE', should return status 201 an res.body.title===product.title", async() => { 
    const res=await request(app)
    .post(URL_BASE)
    .send(product)
    .set('Authorization',`Bearer ${TOKEN}`)
    productId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    
    //await category.destroy()
})


test("GET ALL-> 'URL_BASE', should return status 200 an res.body.length===1", async() => { 
    const res=await request(app)
    .get(URL_BASE)
    
    //console.log(res.body[0].id)
    //console.log(res.body[0])

    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBeDefined()
    //expect(res.body[0].id).toBe(category.id)
    expect(res.body[0].category.id).toBe(category.id)

    
    
})
test("GET FILTER-> 'URL_BASE', should return status 200 an res.body.length===1, res.body[0].category to be defined and res.body[0].category", async() => { 
    const res=await request(app)
    .get(`${URL_BASE}?category=${category.id}`)
    

    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].id).toBe(category.id)
    
    
})


test("GET ONE -> 'URL_BASE/:id', should resturn status code 200 and res.body.title = product.title", async () => {

    const res = await request(app)
      .get(`${URL_BASE}/${productId}`)

     
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
  
    
  
  })

  test("PUT-> 'URL_BASE/id', should return status 200 an res.body.title===productUpdate.title", async() => { 
    const productUpdate={
        title:'Samsung'
    }
    
    
    const res=await request(app)
    .put(`${URL_BASE}/${productId}`)
    .send(productUpdate)

    .set('Authorization',`Bearer ${TOKEN}`)

    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)
    
    
})

test("DELETE-> 'URL_BASE/id', should return status 204", async() => { 
    const productUpdate={
        title:'Samsung'
    }
    
    
    const res=await request(app)
    .delete(`${URL_BASE}/${productId}`)
    .set('Authorization',`Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)
    
    
    await category.destroy()
})
