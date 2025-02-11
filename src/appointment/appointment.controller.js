import Pet from '../pet/pet.model.js'
import Appointment from './appointment.model.js'

export const addAppointment = async (req, res) => {
    try {
        const data = req.body;
        const pet = await Pet.findOne({ name: data.name }); 
        console.log(pet);
        
        if (!pet) {
            return res.status(404).json({
                success: false,
                message: 'Mascota no encontrada'
            });
        }

        const appointment = new Appointment({
            ...data,
            pet: pet._id 
        });
        
        await appointment.save();

        res.status(200).json({
            success: true,
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar la cita',
            error
        });
    }
};
