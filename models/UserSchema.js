const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const keySecret = process.env.JWT_TOKEN;
// console.log(keySecret);
const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
      trim: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: "String",
      required: true,
      minLength: 6,
    },
    tokens: [
      {
        token: {
          type: "String",
          required: true,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
// creating a model

// last login
userSchema.methods.generateUserHistory = async function () {
  const date = new Date();
  this.lastLogins = this.lastLogins.concat({
    lastLogin: date,
  });
  // console.log(date);
  await this.save();

  return this.lastLogins;
};
// password hash
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
// token generate
userSchema.methods.generateAuthToken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, keySecret, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    res.status(422).json(error);
  }
};

const userdb = new mongoose.model("Users", userSchema);
module.exports = userdb;
