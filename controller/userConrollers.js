const {check, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');
const Schema = require('../models/Schema'); 
const jwt = require('jsonwebtoken');

const loadSignup = (req,res)=>{
    title = "Create New Account"
    //Login false - means user isn't login
    res.render("register", {title, errors: [], inputs: {},login: false});
}

const loadLogin = (req,res)=>{
    title = "User login"
    res.render("login", {title, errors: [], inputs: {}, login: false})
}


const postLoginValidation = [
    check('email').not().isEmpty().withMessage("valid email is Required"),
    check('password').not().isEmpty().withMessage("Password must be six Characters long")
]

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("login", { title: 'User Login', errors: errors.array(), inputs: req.body, login: false })
    } else {
        const checkEmail = await Schema.findOne({ email })
        if (checkEmail !== null) {
            const id = checkEmail._id;
            const dbPassword = checkEmail.password;
            const passwordVerify = await bcrypt.compare(password, dbPassword)
            if (passwordVerify) {
                //  Create token
                const token = jwt.sign({ userID: id }, process.env.JWT_SECRET, {
                    expiresIn: "7d"
                })
                console.log("user token: ", token)
                // Create session variable
                req.session.user = token;
                res.redirect("/profile");
            } else {
                res.render("login", { title: 'User Login', errors: [{ msg: 'Your password is wrong' }], inputs: req.body,login: false})
                
            }
        } else {
            res.render("login", { title: 'User Login', errors: [{ msg: 'Email is not found' }], inputs: req.body, login: false})
        }
    }
}

const postRegisterValidation = [
    check('name').isLength({min: 3}).withMessage("Name is Required and Must be Three Characters long"),
    check('email').isEmail().withMessage("valid email is Required"),
    check('password').isLength({min: 6}).withMessage("Password must be six Characters long")
]

const postRegister = async(req, res) => {
    const {name, email, password} =  req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    title = "Create New Account"
    res.render("register",{ title, errors: errors.array(), inputs: req.body,login: false })
    }else{
        try{
         const userEmail = await Schema.findOne({email})
         if(userEmail === null){
             const salt = await bcrypt.genSalt(10)
             const hashed = await bcrypt.hash(password, salt)
             console.log("Your salt:", salt)
         const newUser = new Schema({
 
             name: name,
             email: email,
             password: hashed
         })
         try{
             const createdUser =  await newUser.save();
             req.flash('success', "Your Account has been created successfully")
             res.redirect('/login')
         }catch(err){
            console.log(err.message);
         }
         }else{
             res.render("register",{ title: 'Create new Account', errors: [{msg: "email is alredy exist"}],inputs: req.body, login: false })
 
         }
        }catch(err){
            console.log(err.message)
        }
      
    }
 }
module.exports = {
    loadSignup,
    loadLogin,
    postRegister,
    postLogin,
    postLoginValidation,
    postRegisterValidation,
}