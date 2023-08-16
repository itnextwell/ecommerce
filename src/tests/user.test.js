const request=require("supertest")
const app=require('../app')



const URL_BASE='/api/v1/users'
let TOKEN
let userId
//inicio 
beforeAll(async()=>{
    const user={
        email:'kycaquimbo',
        password:'karla123'
    }
    const res=await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    TOKEN=res.body.token
})

test('GET ALL -> URL_BASE, should return status code 200, res.body to defined and res.body.length===1', async() => { 

    const res= await request(app) 
    .get(URL_BASE)
    .set('Authorization',`Bearer ${TOKEN}`)

    expect(res.status).toBe(200);
    expect(res.status).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body.length).toBe(1)
    
 })


 test("POST 'URL_BASE'-> shoult return status code 201", async() => { 

    const user={
        firstName:'Aleja',
        lastName:'Lopez',
        email:'alpez@hotmail.com',
        password:'aleja123',
        phone:'3204167015'
    }
    const res= await request(app) 
    .post(URL_BASE)
    .send(user)
    userId=res.body.id

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
    

  })

 test('PUT -> URL_BASE/:id, should return status code 200, res.body to be defined and res.body.firstName===userUpdate.firstName ', async () => { 

    const userUpdate={
        firstName:'Yulieth'
    }

    const res=await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send(userUpdate)
    .set('Authorization',`Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)


  })

  test("POST-> 'URL_BASE/login', should return status code 200 and res.body.email===user.email, and res.body.token to be defined", async() => { 

    const user={
        email:'alpez@hotmail.com',
        password:'aleja123'
    }

    const res=await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
   })

   test("POST-> 'URL_BASE/login', should return status code 401", async() => { 

    const user={
        email:'alpez@hotmail.com',
        password:'Invalid password'
    }

    const res=await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    expect(res.status).toBe(401)
    
   })


  test("DELETE -> 'URL_BASE/:id', should return status 204", async() => {

    const res=await request(app)
        .delete(`${URL_BASE}/${userId}`)
        .set('Authorization',`Bearer ${TOKEN}`)

        expect(res.status).toBe(204)

  })