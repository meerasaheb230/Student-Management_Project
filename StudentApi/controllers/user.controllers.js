const bcrypt = require("bcrypt");
const UserModel=require("../models/user.model");
const {
    isValid,
    isValidString,
    isValidObject,
    isValidEmail,
   
  } = require("../utils/validators");
  const {SALT}=require("../utils/constants");

  const getAllUsers=async (req,res)=>{
    const response = {
        success: true,
        code: 200,
        message: "Users list",
        error: null,
        data: null,
        resource: URL,
      };
      try {
        const users = await UserModel.find({});
        response.data = { users };
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            data:null,
            message:"cannot fetch data,internal servor error",
            error:"internal servar error..",
            resource:URL
        });
      }
      
  }


  const getUserById = async (req, res) => {
    const userId  = req.params.userId;
    const response = {
      success: true,
      code: 200,
      message: "User details",
      error: null,
      data: null,
      resource: URL,
    };
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) throw new Error("User does not exist");
      response.data = { user };
      return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            data:null,
            message:error.message,
            error:error.error,
            resource:URL
        });
    }
  };


  const createUser = async (req, res) => {
    const user = req.body;
    const response = {
      success: true,
      code: 201,
      message: "user created successfully",
      data: null,
      error: null,
      resource: req.originalUrl,
    };
    if (!isValid(user) && !isValidObject(user)) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data";
      response.error = "Invalid request data";
      return res.status(400).json(response);
    }

    if (
        !isValid(user.title) ||
        (isValid(user.title) && !isValidString(user.title))
      ) {
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data. title is required";
        response.error = "Invalid request data. title is required";
        return res.status(400).json(response);
      }

      if(user.title!=="Ms"){
        if(user.title!=="Mr"){
            if(user.title!=="Miss"){
        return res.status(400).json({
            success: false,
            code: 400,
            message: "title must be in 'Mr','Ms','Miss'",
            error: "invalid title.",
            data: null,
            resource: req.originalUrl,
          });
        }
        }
    }

    if (
      !isValid(user.name) ||
      (isValid(user.name) && !isValidString(user.name))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. Name is required";
      response.error = "Invalid request data. Name is required";
      return res.status(400).json(response);
    }
    if (
      !isValid(user.email) ||
      (isValid(user.email) && !isValidEmail(user.email))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. Email is required";
      response.error = "Invalid request data. Email is required";
      return res.status(400).json(response);
    }
    if (
      !isValid(user.password) ||
      (isValid(user.password) && !isValidString(user.password))
    ) {
      response.success = false;
      response.code = 400;
      response.message = "Invalid request data. password is required";
      response.error = "Invalid request data. password is required";
      return res.status(400).json(response);
    }
    try {
      const isEmailExist = await UserModel.findOne({
        email: user.email,
      });
      if (isEmailExist)
        {
            return res.status(400).json({
                success:false,
                code:400,
                message:"email id already exist in database. provide new email Id.",
                error:null,
                resource:URL
            })
        }
    } catch (error) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
    const hashPassword = await bcrypt.hash(user.password.trim(), SALT);
    const cleanedUserData = {
      title:user.name.trim(),  
      name: user.name.trim(),
      email: user.email.trim(),
      password: hashPassword.trim(),
    };
    
    try {
      const newUser = new UserModel(cleanedUserData);
      await newUser.save();
      response.data = { user: newUser };
      
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            data:null,
            message:"cannot fetch data,internal servor error",
            error:"internal servar error..",
            resource:URL
        });
    }
  };

  const updateUser= async (req,res)=>{
    const userId=req.params.userId;
    const userData=req.body;
    const response={
        success:true,
        code:200,
        message:"usr is upadated successfully",
        data:null,
        error:null,
        resourse:req.originalUrl
    }
    if(!isValid(userData)||!isValidObject(userData)){
        return res.status(400).json({
            success:false,
            code:400,
            message:"Empty requestt body. nothing to update",
            error:err.message,
            resourse:req.originalUrl
        })

    }
  
    if (isValid(userData.email) && isValidEmail(userData.email)) {
        try {
          const isEmailExist = await UserModel.findOne({
            email: userData.email,
            _id: { $ne: userId },
          });
          if (isEmailExist)
            throw new Error(
              `This email ${userData.email} id is already registered.`
            );
        } catch (error) {
          return res.status(400).json({
            success: false,
            code: 400,
            message: error.message,
            error: error,
            data: null,
            resource: req.originalUrl,
          });
        }
      }
    try {
        const isidExist=await UserModel.findById(userId);
        if(!isidExist)
        throw new Error("user id does not exist");

        
        const hashedPassward=await bcrypt.hash(userData.password,SALT);
            const updatedata={
                title: userData.title,
                name:userData.name,  
                email: userData.email,
                password: hashedPassward
            }

            const newData=await UserModel.findByIdAndUpdate(userId,{$set:updatedata},{new:true})
            response.data={user:newData};
            return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            success: false,
            code: 400,
            message: error.message,
            error: error,
            data: null,
            resource: req.originalUrl,
          })
        
    }
 
    
}

const deleteUser= async (req,res)=>{
    const userId=req.params.userId;
    const response={
        success:true,
        code:200,
        mesage:"user is deleted successfully",
        data:null,
        error:null,
        resourse:req.originalUrl
    }
    try {
        const newData=await UserModel.findByIdAndDelete(userId);
        response.data={user:newData};
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            success:false,
            code:400,
            message:error.mesage,
            error:error,
            data:null,
            resourse:req.originalUrl
        })
    }
   }


module.exports={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
