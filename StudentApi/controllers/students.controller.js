const {isValid,isValidMobile,isValidObject,isValidString}=require("../utils/validators");
const { isValidObjectId } = require("mongoose");
const StudentModel=require("../models/students.model");

const getAllStudents=async (req,res)=>{
  try {
    const students = await StudentModel.find({
      // isDeleted: false,
      // createdBy: res.locals.userId,
    }); 
    return res.status(200).json({
      success: true,
      code: 200,
      message: "students list",
      data: { students },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
};

const getStudentById = async (req, res) => {
  const StudentId = req.params.StudentId;
  if (!isValidObjectId(StudentId)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid StudentId",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  try {
    const student = await StudentModel.findOne({ _id: StudentId, isDeleted: false });
    if (!student) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Invalid request, student id does not exist",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    if (student.createdBy.toString() !== res.locals.userId) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Invalid request, forbidden",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    return res.status(200).json({
      success: true,
      code: 200,
      message: "student details",
      data: { student },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
};

const newStudent=async (req,res)=>{
  const studentData=req.body;
 
  if (!isValid(studentData) || (isValid(studentData) && !isValidObject(studentData))) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, missing request data.",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  if (
    !isValid(studentData.title) ||
    (isValid(studentData.title) && !isValidString(studentData.title))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, title is  required .",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  if (
    !isValid(studentData.name) ||
    (isValid(studentData.name) && !isValidString(studentData.name))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, name is  required .",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  if (
    !isValid(studentData.collegeName) ||
    (isValid(studentData.collegeName) && !isValidString(studentData.collegeName))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, collegeName is  required .",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  if (
    !isValid(studentData.gender) ||
    (isValid(studentData.gender) && !isValidString(studentData.gender))
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, gender is  required .",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  // if (
  //   !isValid(studentData.address) ||
  //   (isValid(studentData.address) && !isValidObject(studentData.address))
  // ) {
  //   return res.status(400).json({
  //     success: false,
  //     code: 400,
  //     message: "Invalid request, address is  required .",
  //     data: null,
  //     error: null,
  //     resource: req.originalUrl,
  //   });
  // }

  if (
    !isValid(studentData.mobile) || !isValidMobile(studentData.mobile)
  ) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid request, mobile is  required .",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  try {
    const ismobileExist= await StudentModel.findOne({mobile:studentData.mobile, isDeleted:false})
    if(ismobileExist){
      return res.status(400).json({
        success: false,
        code: 400,
        message: "mobile is already exist.",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    
    const student = await StudentModel.create({
      title: studentData.title.trim(),
      name: studentData.name.trim(),
      collegeName: studentData.collegeName.trim(),
      gender: studentData.gender.trim(),
      // address: {street:studentData.address.street,
      //   city:studentData.address.city,
      //   pincode:studentData.address.pincode
      // },
      mobile: studentData.mobile,

      createdBy: res.locals.userId,
    });
    return res.status(201).json({
      success: true,
      code: 201,
      message: "student created successfully",
      data: { student },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
  
}

const updateStudent=async (req,res)=>{
        const StudentId=req.params.StudentId;
        const StudentData=req.body;
        const response={
            success:false,
            code:200,
            message:"Student details updated successfully",
            data:null,
            error:null,
            resource:URL
        }
        if(!isValid(StudentData)||!isValidObject(StudentData))
      {
          return res.status(400).json({
              success:false,
              code:400,
              message:"Invalid request. StudentData  is required for update.",
              data:null,
              error:null,
              resource:req.URL
          })
      }
        try {  
        const Studentexist=await StudentModel.findById({_id:StudentId,isDeleted:false});
        if(!Studentexist){
            return res.status(404).json({
               success:false,
               code:404,
               message:"Student  doesn't exist with this Id",
               data:null,
               error:null,
               resource:URL
            })
        }
        const updateStudentData={
            title: StudentData.title,
            name: StudentData.name,
            collegeName: StudentData.collegeName,
            gender: StudentData.gender,
            address: StudentData.address,
            mobile: StudentData.mobile,
        }
        if (Studentexist.createdBy.toString() !== res.locals.userId) {
          return res.status(403).json({
            success: false,
            code: 403,
            message: "Invalid request, forbidden",
            data: null,
            error: null,
            resource: req.originalUrl,
          });
        }
       
        const newData=await StudentModel.findByIdAndUpdate({_id:StudentId},{$set:updateStudentData},{new:true});
        response.data={updated_StudentData:newData};
        return res.status(200).json(response);
       
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                    success:false,
                    code:500,
                    message:"inValid Server , internal server error",
                    data:null,
                    error:error,
                    resource:URL
            });
        }
    
}
const deleteStudent=async (req,res)=>{
  const StudentId = req.params.StudentId;
  if (!isValidObjectId(StudentId)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid StudentId",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  try {
    const student = await StudentModel.findOne({ _id: StudentId, isDeleted: false });
    if (!student) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Invalid request, student does not exist with this id",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    if (student.createdBy.toString() !== res.locals.userId) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Invalid request, forbidden",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    student.isDeleted = true;
    student.deletedAt = new Date().toISOString();
    await student.save();
    return res.status(200).json({
      success: true,
      code: 200,
      message: "student deleted successfully",
      data: { student },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
}


module.exports={
    getAllStudents,
    newStudent,
    updateStudent,
    deleteStudent,
    getStudentById
}