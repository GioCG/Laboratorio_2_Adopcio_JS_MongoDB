import { response,request } from "express";
import {hash, verify} from 'argon2';
import User from './user.model.js';

export const getUsers = async (req = request, res = response) => {
    try {
        const {limite = 10,desde = 0} = req.query;
        const query = {estado:true};

        const [total,users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ])

        res.status(200).json({
            succes: true,
            total,
            users
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg:'Error al obtener usuarios',
            error
        })
    }
}

export const getUserById = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                msg:'Usuario not found'
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obrener usuario',
            error
        })
    }
}

export const updateUser = async (req,res = response) =>{
    try {
        const {id} = req.params;
        const { _id,email, password, ...data} = req.body;

        const user = await User.findByIdAndUpdate(id,data,{new:true});

        res.status(200).json({
            success:true,
            msg:'Usuario Actualizado',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error
        })
        
    }
}

export const updateUserPassword = async (req, res) => {
    try {
        const {id} = req.params;
    
        const {password} = req.body;
        console.log("hola");
        
        if (!password || password.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña es obligatoria",
            });
        }
        if(await verify(user.password, password)){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
        const encriptPassword = await hash(password)
        const userUpdated = await User.findByIdAndUpdate(id, { password: encriptPassword }, { new: true });
        if (!userUpdated) {
            return res.status(400).json({
                success: false,
                message: "No se pudo actualizar la contraseña",
            });
        }
        return res.status(200).json({
            success:true,
            msg:'Contraseña Actualizada',
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la contraseña',
            error
        })
    }
}

export const deleteUser = async(req,res) => {
    try {
        const{id} = req.params;
        const user = await User.findByIdAndUpdate(id,{estado:false},{new:true});
        const authenticatedUser = req.user;
        res.status(200).json({
            success: true,
            msg: 'Usuario desactivado',
            user,
            authenticatedUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar usuario',
            error
        })
    }
}

