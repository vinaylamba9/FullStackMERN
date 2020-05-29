const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // save timestamp on creation in DB
);

// So this comment is really imp to read.
// Now, as when we are using virtual, we need to use the virtual key (here is "password") to send the data through request on save.
// If we send data using encry_password it wont come to virtual and directly store as string in DB, and only when we use password: 1234 like
// this then, it will come to virtual and store the encry_password as hashed password and also salt (as that is set in virtual only)
// In DB it will stored as encry_password only, but directly as string | using virtual as hashed
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid.v1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encry_password === this.securePassword(plainPassword);
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
