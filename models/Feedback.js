const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    time: {type: Date, required: true}
}, {versionKey: false})

module.exports = model('Feedback', schema)