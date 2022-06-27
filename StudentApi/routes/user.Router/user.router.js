const express=require("express");
const router=express.Router();

const userControllers=require("../../controllers/user.controllers");
const loginController=require("../../controllers/login.controller");


router.get("/users",userControllers.getAllUsers);
router.get("/users/:userId",userControllers.getUserById);
router.post("/users",userControllers.createUser);
router.put("/users/:userId",userControllers.updateUser);
router.delete("/users/:userId",userControllers.deleteUser);


router.post("/login",loginController.login);

module.exports=router;