const { getAll, create, remove } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');
const { setImage } = require('../controllers/product.controller');


const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post( upload.single('image') ,create)

routerProductImg.route("/:id")
    .delete(remove)
    .post(setImage)

module.exports = routerProductImg;