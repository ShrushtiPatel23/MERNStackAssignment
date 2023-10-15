const mongoose = require('mongoose')
const { Schema } = mongoose;

const DataSchema = new Schema({
    date: {
        type: String,
        required:true
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    }

},
    {
        freezeTableName: true,
        timestamps: false

    });

const Data = mongoose.model('datas', DataSchema)
module.exports = Data;    