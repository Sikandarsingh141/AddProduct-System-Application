//Define UserSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 3
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }

},{ timestamps: true })

//create Model
const User  = mongoose.model("user",userSchema);

// const name = "Hansika Singh";
// const email = "hansikasingh38@gmail.com";
// const phone = 9634320267;
// const newUser = new User({
//     name,
//     email,
//     phone
// })
// newUser.save().then(user =>{
//     console.log(user)
// }).catch(err =>{
//     console.log(err.message)
// })

// User.find({_id: '609edc16b22507051c421d94'}).then(users =>{
//     console.log(users)
// }).catch(error =>{
//     console.log(error.message)
// }
// User.findByIdAndUpdate('609edc16b22507051c421d94',{ name: 'Saumya  // Jasiwal', email: "saumyajaiswal@gmail.com", password: 9634620267}).// then(user =>{
//     console.log(user)
// }).catch(error =>{
//     console.log(error.message)
// })

User.findByIdAndDelete('609edc16b22507051c421d94').then(()=>{
    console.log("successfilly Deleted File")
}).catch(error =>{
    console.log(error.message)

})