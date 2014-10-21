var mongoose = require('mongoose');

var Familly = mongoose.model('Familly',{
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
