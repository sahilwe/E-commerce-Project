import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";

//router object
const router = express.Router();

//routing
// REGISTER || Method POST

router.post("/register", registerController);

//forgetPassword || POST

router.post("/forget-password", forgetPasswordController);

// Login || POST

router.post("/login", loginController);

//test routes
// router.get("/test", requireSignIn, isAdmin, testController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", updateProfileController);

router.get("/orders", requireSignIn, getOrderController);

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
