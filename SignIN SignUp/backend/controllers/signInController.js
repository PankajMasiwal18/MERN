const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp_model = require('../models/signUpModel');


module.exports.signIn = async (req, res) => {

    try {
        // checking email exists
        console.log("req.body.email", req.body.email);
        const user = await signUp_model.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: "Email is not found ." });
        }

        // Password Correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).send({ message: "Invalid Password ." });
        }
        else {
            // create and assign token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            console.log("token", token);
            res.header("auth-token", token).send(token)
        }

    }
    catch (err) {
        console.log('err', err);
        res.status(500).json({ error: err });
    }
}
