import { Router } from "express";
import { uploadJob } from "../controllers/uploadJob.controller.js";

const router=Router();

router.route("/upload-job").post(uploadJob);

export default router