const { Account, Person } = require("../models");
const { generateToken } = require("../services/middleware");

const login = (req, res) => {
    let { email, password, role } = req.body;
    let response = {
        access_token: '',
        role: '',
        data: {}
    }
    try {
        console.log("2-->" ,{ email: email, password: password, role: role })
        Account.findOne({ email: email, password: password, role: role }).exec((err, user) => {
            if (err) {
                res.status(500).json(err)
            } else {
                if (user === null || user === undefined) {
                    res.status(401).send({
                        message: 'Invalid Credentials'
                    })
                    return
                }
                response.access_token = generateToken(user._id);
                response.data = {
                    userId: user._id,
                    role
                }
                res.json(response)
            }
        })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

const createUserAccount = (details, callback, onError = null) => {
    // functions creates account model
    try {
        let account = new Account(details)
        account.save((err, account) => {
            if (err) return onError(err);
            // fetch account with profile
            // reference https://stackoverflow.com/questions/13525480/mongoose-populate-after-save
            let details = account.populate('profile').execPopulate();
            details.then(details => {
                callback(details)
            });
        })
    } catch (error) {
        onError(error)
    }

}

const register = (req, res) => {
    try {
        // this function saves the Person Schema
        let info = JSON.parse(req.body.info)
        let person = new Person(info);
        person.save((err, person) => {
            let imageName = '';
            if (req.file) {
                imageName = req.file.filename
            }
            if (err) return res.status(500).send(err)
            // after saving the Person , it will call the create user funtion 
            createUserAccount({
                profile: person._id,
                email: info.email,
                password: info.password,
                profilePicture: imageName,
            }, (acct) => {
                // if create user is successful
                let saved = acct;
                saved.password = ''
                console.log(saved)
                res.json(acct)
            }, err => {
                // if create user is not successful
                res.status(500).send(err)
            })
        });
    } catch (error) {
        // error in saving the person
        res.status(500).send(error)
    }

}

module.exports = {
    login, register
}