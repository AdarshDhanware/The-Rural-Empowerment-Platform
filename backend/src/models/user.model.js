import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// mongo db "PRE hook" run before data is save

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await brcypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await brcypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id:this._id,
      phoneNo:this.phoneNo,
      username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    
  )
}

export const User = mongoose.model("User", userSchema);
