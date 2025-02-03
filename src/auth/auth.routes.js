import { Router } from "express";
import { registerValidator, loginValidator } from "../middlewares/validator.js";
import { login,register } from "../auth/auth.controller.js";
import {deleteFileOnError} from "../middlewares/delete-file-on-error.js"
import {uploadProfilePicture} from "../middlewares/multer-upload.js"

const router = Router();
 
router.post(
    '/login',
    loginValidator,
    deleteFileOnError,
    login
);
 
router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
)
 
export default router;