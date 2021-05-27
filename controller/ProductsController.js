const formidable = require('formidable');
const {v4: uuidv4} = require('uuid');
const Schema = require('../models/Schema');
const {check, validationResult} = require("express-validator");
const Products = require('../models/products');
const fs = require('fs');
const date = require('dateformat');
const productsForm = (req,res)=>{
    res.render('addProducts', {title: 'Add Products', login: true, errors: [], name: "", price: "", qty: "", category: ""})
}

//parse --> methed will give the access from the Forms, like title, body, image parse methed will give the access
const storeProducts = (req, res) => {
   
         const form = formidable();
         form.parse(req, (err, fields, files) => {
         const errors = []    
         const {title, price, qty, category} = fields;
         if(title.length === 0){
                errors.push({msg: "Please Write Your Product Name"})
         }
          if(price.length === 0){
                errors.push({msg: "Write The Product price  Required"})
         }
          if(qty.length === 10){
                errors.push({msg: "Product Quantity is Required Please add atleast 1 products"})
         }
           if(category.length === 0){
                errors.push({msg: "Please Write Your Product category"})
         }
         
         const imageName = files.image.name;
         const split = imageName.split(".");
         const imageExt = split[split.length - 1].toUpperCase();
         if(files.image.name.length === 0){
            errors.push({msg: "Image is Required"})
         }else if(imageExt !== "JPG" && imageExt !== "PNG"){
            errors.push({msg: "Only jpg and pag are allowes"})
         }
         if(errors.length !== 0){
             res.render("addProducts", {title: "add new Products", login: true, errors, name: title, price, qty, category })
         }else{
           files.image.name = uuidv4() + "." + imageExt;
           const oldPath = files.image.path
           const newPath = __dirname + "/../views/asserts/img/" + files.image.name;
           fs.readFile(oldPath, (err, data) =>{
               if(!err){
                   fs.writeFile(newPath, data, (err) => {
                       if(!err){
                           fs.unlink(oldPath, async(err) =>{
                               if(!err){
                                const id = req.id;
                                try {
                                    const user = await Schema.findOne({ _id: id })
                                    const name = user.name;
                                    const newProduct = new Products({
                                        userID: id,
                                        title,
                                        price,
                                        qty,
                                        category,
                                        image: files.image.name,
                                        userName: name
                                    })
                                    try {
                                        const result = await newProduct.save();
                                        if (result) {
                                            req.flash('success', "Your Product has been stored successfully")
                                           res.redirect('/products')
                                        }
                                    } catch (err) {
                                        res.send(err.msg)
                                    }
                                } catch (err) {
                                    res.send(err.msg);
                                }
                            }
                        })
                    }
                })
            }
        })
    }
})
}

// // updatedAt - 1: disending order, post display at time and display as a desending order
// const products = async(req, res)=>{
//     const id = req.id;
//     const allProducts = await Products.find({userID: id}).sort({updatedAt:  - 1});
//     res.render("ProductsPost", {title: "Products", login: true, products: allProducts})

// }
// module.exports = {
//     productsForm,
//     storeProducts,
//     products
// }

const UserProducts = async(req, res)=>{
    const id = req.id;
        const allProducts = await Products.find({userID: id}).sort({updatedAt:  - 1});
         res.render("ProductsPost", {title: "Products", login: true, products: allProducts, formate: date})

    //    res.render("ProductsPost", {title: "Products", login: true})
}
// const Details = async(req,res) =>{
//     const id = req.id;
//     try{
//         const details = await Products.findOne({ userID: id })
//         res.render('details', {title: "Product Details", login: true,details })
//     }catch(err){
//         res.send(err)

//     }
   
// }
const Details = async(req,res) =>{
    const id = req.params.id;
    try{
        const details = await Products.findOne({ _id: id })
        res.render('details', {title: "Product Details", login: true,details })
    }catch(err){
        res.send(err)

    }
   
}
const updateForm = async(req,res)=>{
    const id = req.id;
    try{
        const product = await Products.findOne({ userID: id  });
        res.render('update', {title: 'Update Product', login: true, errors: [], product })
    }catch(err){
        res.send(err)
    }
  
}

const ProductValidation = [
    check('title').not().isEmpty().withMessage("name is Required"),
    check('price').not().isEmpty().withMessage("price is Required"),
    check('qty').not().isEmpty().withMessage("qty is Required"),
    check('category').not().isEmpty().withMessage("category is Required")
    
]

const productUpade = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const id = req.body.hiddenID;
        const product = await Products.findOne({ _id: id})
        res.render('update', {title: 'Update Product', login: true, errors: errors.array(), product });
    }
    else{
        const { hiddenID, title, price, qty, category, } = req.body;
        try{
            const updateResult = await Products.findByIdAndUpdate(hiddenID, {title, price, qty, category})
            if(updateResult){
                req.flash('success', "Your Product has been Updated successfully")
                res.redirect('/products')
 
            }

        }catch(err){
            res.send(err)
        }
    }

}

const ProductDelete = async (req,res) =>{
    const id = req.body.deleteID;
    
    try{
        const responce = await Products.findByIdAndRemove(id);
        if(responce){
            req.flash('success', "Your Product has been Deleted successfully")
            res.redirect('/products')
        }
    } catch(err){
        res.send(err)
    }

}

module.exports = {
    productsForm,
    storeProducts,
    UserProducts,
    Details,
    updateForm,
    productUpade,
    ProductValidation,
    ProductDelete
}
