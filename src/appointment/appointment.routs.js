import { Router } from "express";
import { check } from "express-validator";
import { addAppointment } from "./appointment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    "/", 
    [
        validarJWT,
        check('name', 'No existe una mascota con este nombre').not().isEmpty(),
        validarCampos
    ], 
    addAppointment
);

export default router;