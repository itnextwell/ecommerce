const User = require("../../models/User")

const userCreate=async()=>{
    const userBody={
    firstName:'karla',
    lastName:'caquimbo',
    email:'kycaquimbo',
    password:'karla123',
    phone:'3204167015'
}

    await User.create(userBody)

}

module.exports=userCreate