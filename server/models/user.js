const {Schema, model} = require ('mongoose')
const userSchema = new Schema({
    email:String,
    name: String,
    password:String,
    questions: Object
})
const User = model('users', userSchema)
module.exports = User