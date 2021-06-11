const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

const signUp_model = require('../models/signUpModel');

module.exports.create_account = async (req, res) => {

    // Hash Password
    // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    var userDetail = new signUp_model({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const result = await userDetail.save();
        res.status(200).json({ data: result });

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: `${req.body.email}`, //where we want to send email   
            from: 'pankaj.masiwal@mail.vinove.com', // Use the email address or domain you verified above
            subject: 'SignUp',
            html: 
            `<div>
                <p>Welcome <strong>${req.body.name}<strong></p>
                <p><strong>Thank you for joining !<strong></p>
                <button style="color:white; background-color:blue; border:none; border-radius:5px">SignIn</button>
            </div>`,
        };

        sgMail.send(msg)
            .then(() => {
                console.log("mail send.")
            }, error => {
                console.error(error);
            });
    }
    catch (err) {
        if (err.code == 11000) {
            res.status(400).json({ message: "Email already exist ." })
        }
        else {
            res.status(501).json({ error: err });
        }
    }
}

module.exports.update_account = async (req, res) => {

    // Hash Password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    var userDetail = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }
    try {
        const updatedData = await signUp_model.findByIdAndUpdate({ _id: req.params.id }, { $set: userDetail }, { new: true });
        res.status(200).send(updatedData);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports.delete_account = async (req, res) => {
    try {
        await signUp_model.findByIdAndDelete(req.params.id);
        res.status(200).send("Successfully Deleted");
    }
    catch (err) {
        res.status(500).send(err);
    }
}