const mongoose = require("mongoose");
//connect mongodb
const connection = async() => {
    try{
        await mongoose.connect("mongodb://localhost/MoonTask", { useNewUrlParser: true ,useUnifiedTopology: true})
        console.log("Database Connected")
    }catch(err){
          console.log(err.message)
    }
   
} 
connection();


