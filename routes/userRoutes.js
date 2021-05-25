const express = require("express");
const router = express.Router();
const {
    loadSignup,
    loadLogin,
    postRegisterValidation,
    postRegister,
    postLogin,
    postLoginValidation
    
} = require('../controller/userConrollers')

const {stopLogin} = require('../middleware/auth');

router.get('/',stopLogin,loadSignup);
router.get("/login",stopLogin,loadLogin);
router.post("/postLogin",postLoginValidation, postLogin,)
router.post("/register",postRegisterValidation,postRegister );

module.exports = router;
 
