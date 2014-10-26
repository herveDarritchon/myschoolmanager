var mongoose = require('mongoose');

var famillySchema = {
    surname: String,
    firstname: String,
    email: String,
    children: [{
        firstname: String,
        sexe: String
    }]
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
