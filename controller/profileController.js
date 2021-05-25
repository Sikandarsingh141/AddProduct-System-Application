const Schema = require('../models/Schema');

const profile = async (req,res) =>{
    const id = req.id;
    const user = await Schema.findOne({_id: id})
    res.render('profile', {title: 'Profile', login: true, user})
}

const logout = (req,res) =>{
    req.session.destroy((err)=>{
        if(!err){
            res.redirect('/login')
        }
    })
}

module.exports = {
    profile,
    logout
}