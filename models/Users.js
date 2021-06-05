const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true}
}, {versionKey: false})

module.exports = model('Users', schema)