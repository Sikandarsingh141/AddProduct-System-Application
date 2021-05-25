const mongoose = require("mongoose");
//connect mongodb
const connection = async() => {
    try{
        await mongoose.connect("mongodb+srv://sikandarsingh:GV0H6kiOhwoanR3W@cluster0.vo90j.mongodb.net/crud-application?retryWrites=true&w=majority", { useNewUrlParser: true ,useUnifiedTopology: true})
        console.log("Database Connected")
    }catch(err){
          console.log(err.message)
    }
   
} 
connection();


