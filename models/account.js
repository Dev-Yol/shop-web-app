const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // profilePicture: { type: String },  optional 
    profile: { type: Schema.ObjectId, ref: 'Person' }
})

const Account = model("Account", AccountSchema);
module.exports = Account;