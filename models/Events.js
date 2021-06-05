const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    artist: {type: String, required: true},
    image: {type: String, required: true},
    date_time: {type: Date, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true}
}, {versionKey: false})

module.exports = model('Events', schema)