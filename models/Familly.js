var mongoose = require('mongoose');

var childrenSchema = {
    firstname: String,
    sexe: String,
    birthdate: String
}

var famillySchema = {
    surname: String,
    firstname: String,
    email: String,
    children: [childrenSchema]
};

var Familly = mongoose.model('Familly', famillySchema, 'school');


/*
var mongoose = require('mongoose');

var FamillySchema = new mongoose.Schema({
    surname: String,
    firstname: String,
    email: String,
    children: [
        {
            firstname: String,
            sexe: String
        }
    ]
});

mongoose.model('Familly', FamillySchema);
*/

module.exports = Familly;
