const { HttpError, ctrlWrapper } = require("../helpers");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp"); 
const crypto = require("crypto")
const {nanoid} = require('nanoid');
const {sendMail} = require('../helpers');

const avatarDir = path.join(__dirname, "..", "public", "avatars");
const {BASE_URL} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user !== null) {
    throw HttpError(409, "Email in use");
  }
  const hash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
const verificationToken = nanoid()

  const newUser = await User.create({ email, password: hash, avatarURL, verificationToken });
const verifyEmail = { 
  to: email,
  subject: "Verify email",
  html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Verify email</a>`
}

await sendMail(verifyEmail);

  return res.status(201).json({ user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
  }
if(!user.verify){ 
  throw HttpError(401, "Email not verifield")
}

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch === false) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token: token,
    user: user,
  });
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).end();
};

const current = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  console.log(user);
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const uploadAvatar = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file; 
  const filename = `${crypto.randomUUID()}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
await Jimp.read(resultUpload).then(img => {
  return img.resize(250, Jimp.AUTO).writeAsync(resultUpload)
}).catch(err => console.log(err))
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const verifyEmail = async (req, res) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if(!user) {
    throw HttpError(401, 'Email not found')
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""})

  res.json({message: 'Verification successful'})
}

const resendVerifyEmail = async (req, res) => {
const {email} = req.body;
const user = await User.findOne({email});

if(!user) {
  throw HttpError(401, "Email not found");
}

if(user.verify){ 
  throw HttpError(400, "Verification has already been passed")
}
const verifyEmail = { 
  to: email,
  subject: "Verify email",
  html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Verify email</a>`
}

await sendMail(verifyEmail)

res.json({
  message: "Verification email sent"
})

}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  uploadAvatar: ctrlWrapper(uploadAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
