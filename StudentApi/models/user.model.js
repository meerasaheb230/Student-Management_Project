const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    title:{type:String,require:true},
    name:{type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) =>
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
          message: `Please enter a valid email address`,
        },
      },
      password: {
        type: String,
        required: true,
      }
},{timestamps:true}

);

module.exports=mongoose.model("User",UserSchema);