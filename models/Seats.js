const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    sector: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    owner: {type: Types.ObjectId, ref: 'Events', required: true}
},{versionKey: false})

module.exports = model('Seats', schema)
