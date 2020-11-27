const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "user" },
})

const Person = model("Person", PersonSchema);
module.exports = Person;