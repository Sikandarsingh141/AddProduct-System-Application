const express = require("express");
const router = express.Router();

const {productsForm, storeProducts, UserProducts,Details, updateForm,productUpade,ProductValidation,ProductDelete} = require('../controller/ProductsController');
const {auth} = require("../middleware/auth");

router.get('/addProducts',auth,productsForm);
router.post('/createProducts',auth,storeProducts);
router.get('/products', auth, UserProducts);
router.get('/details/:id',auth, Details);
router.get('/update/:id', auth, updateForm );
router.post('/delete',auth,ProductDelete);
router.post('/createupdate',[ProductValidation, auth],productUpade)
// router.post('/createupdate', [ProductValidation,auth],productUpade);

module.exports = router; 