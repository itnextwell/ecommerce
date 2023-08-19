const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");


//Product->CategoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart->productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Cart->userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Purchase->userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase->productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)