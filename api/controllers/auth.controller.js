import User from '../models/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/createError.js';
export const register = async (req, res,next) => {
  try {
const hashPassword =  bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    const err = createError(500, "Something went wrong" + error);
    next(err);
  }

};

export const login = async (req, res,next) => {
try {
  const user = await User.findOne({username: req.body.username});
  const err = createError(404, "User not found");
if(!user) next(err);
  const isCorrect = bcrypt.compareSync(req.body.password, user.password);
if(!isCorrect) next(createError(400, "Wrong password"));
const {password, ...otherInfo} = user._doc;
  const token = jwt.sign({
    id: user._id,
    isSeller: user.isSeller,
  },
  process.env.JWT_TOKEN,)
  res.cookie("accessToken",token,{
    httpOnly: true,
  }).status(200).send(otherInfo);
} catch (error) {
  const err = createError(500, "Something went wrong" + error);
  next(err);

}

};

export const logout = async (req, res) => {
  res.cookie("accessToken", {
    sameSite: "none",
    secure: true,
  }, {
    httpOnly: true,
    expires: new Date(0),
  }).status(200).send("User logged out");
 
};
