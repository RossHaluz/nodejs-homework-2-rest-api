const { HttpError, ctrlWrapper } = require("../helpers");
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(user !== null) {
        throw HttpError(409, "Email in use")
    }
const hash = await bcrypt.hash(password, 10)
const newUser = await User.create({email, password: hash})
return res.status(201).json({user: newUser})
} 

const login = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(user === null){
    throw HttpError(401, "Email or password is wrong")
}
const isMatch = await bcrypt.compare(password, user.password);
if(isMatch === false){
    throw HttpError(401, "Email or password is wrong");
}

const payload = {
    id: user._id,
}

const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"})

 res.status(200).json({
    token: token,
    user: user
})
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login)
}