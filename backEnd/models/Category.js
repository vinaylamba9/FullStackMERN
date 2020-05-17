const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      maxlength: 32,
      trim: true,
      required: true,
    },
  },
  { timestamps: true } // save timestamp on creation in DB
);

module.exports = mongoose.model("Category", categorySchema);
