var mongoose = require('mongoose');

var FamillySchema = new mongoose.Schema({
    surname: String,
    firstname: String,
    email: String,
    __v: {type: Number, select: false},
    children: [
        {
            firstname: String,
            sexe: String
        }
    ]
});

mongoose.model('Familly', FamillySchema);
