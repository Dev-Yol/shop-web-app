const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    middlename: { type: String, required: false },
    addresses: { type: [String], required: true }
})

const Person = model("Person", PersonSchema);
module.exports = Person;