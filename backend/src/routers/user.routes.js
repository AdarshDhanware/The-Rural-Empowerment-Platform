import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, userProfile, yourUploadedJobs } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { loginUser } from "../controllers/login.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/profile").post(userProfile);
router.route("/your-jobs").post(yourUploadedJobs);

export default router;
