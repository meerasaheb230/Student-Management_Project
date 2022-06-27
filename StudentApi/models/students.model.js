const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    title: { type: String, required: true },
    name:{ type: String, required: true },
    collegeName:{ type: String, required: true },
    gender:{ type: String, required: true },
    address: {
        street: { type: String },
        city: String,
        pincode: Number,
      },

    mobile:{ type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);
