import express from "express";
import {loginController , registerController , testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

//routing, registering someone
router.post('/register',registerController)

//LOGIN || POST
router.post("/login", loginController);

router.post("/forgot-password",forgotPasswordController);

// protected User route auth
router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({ ok: true});
});

// protected Admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) => {
    res.status(200).send({ ok: true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

router.get("/test",requireSignIn,isAdmin,testController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router