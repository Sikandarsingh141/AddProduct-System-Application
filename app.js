const express = require("express");
require("./models/db");
const env = require('dotenv')
const app = express();
const ProileRoutes = require('./routes/profileRoutes');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('express-flash');
const userRouter = require('./routes/userRoutes');
const productsRoutes = require("./routes/ProducsRoutes");
//Database connected
env.config();
//Express session middlware
//it will create session collection in database and put the record of the  users
const store = new MongoDBStore({
    uri: 'mongodb://localhost/blog-website',
    collection: 'session'
}) 
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 7 * 24 * 60 * 1000
    },
    store: store
}))
//Flash Middleware, by this function we can display flash message
//this function is depended to the express-session function
app.use(flash());
app.use((req,res,next)=>{
    res.locals.message = req.flash()
    next();

})
//load static file for css
app.use(express.static("./views"));
app.use(express.urlencoded({extended: true}));
//set ejs
app.set("view engine","ejs")
//userRouters
app.use(userRouter);
app.use(ProileRoutes);
app.use(productsRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Sever is running on port no. 8000`);
})