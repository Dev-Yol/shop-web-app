const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    profile: { type: Schema.ObjectId, ref: 'Person' }
})

const Account = model("Account", AccountSchema);
module.exports = Account;