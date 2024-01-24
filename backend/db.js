const mongoose  = require('mongoose');
const {Schema} = mongoose  ;

mongoose.connect("mongodb+srv://admin:123456780@cluster0.ovji0ym.mongodb.net/paytmDB")


//creating the user scehema
const userSchema = new Schema({
    username: String ,
    firstName: String ,
    lastName: String , 
    password: String 
})

//converting the schema to the model
const User = mongoose.model('User' , userSchema)
module.exports = {
	User
};