const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'Users', required: true},
    details: [{sector: {type: String}, price: {type: Number}}],
    event: {type: String, required: true},
    event_time: {type: Date, required: true},
    place:{type: String, required: true},
    total_cost: {type: Number, required: true},
    date_time: {type: Date, required: true}
},{versionKey: false})

module.exports = model('Orders', schema)