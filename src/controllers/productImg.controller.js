const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const result= await ProductImg.findAll()
    return res.json(result)
});

module.exports = {
    getAll
}