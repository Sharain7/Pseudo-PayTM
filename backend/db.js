const mongoose  = require('mongoose');
require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const {Schema} = mongoose  ;

mongoose.connect(dbConnectionString);


//creating the user scehema
const userSchema = new Schema({
    username: String ,
    firstName: String ,
    lastName: String , 
    password: String ,
    account: [{type: Schema.Types.ObjectId, ref: "Account"}]
})

//converting the schema to the model
const User = mongoose.model('User' , userSchema)
module.exports = {
	User
};

//2. Creating the Account Schema for Users
const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User" , 

    },
    balance: Number
})
const Account = mongoose.model('Account' , accountSchema)
module.exports = {
	Account
};