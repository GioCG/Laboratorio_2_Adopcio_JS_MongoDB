import {Schema, model} from "mongoose";

const appointmentSchema = Schema({
    pet:{
        type:Schema.Types.ObjectId,
        ref:'pet',
        required:true
    },
    date:{
        type: Date,
        required: true
    },
    appodescription: {
        type:String,
        required: true
    },
    type:{
        type: String,
        uppercase: true,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
        timestamps: true,
        versionKey: false
});

    export default model('Appoinntment',appointmentSchema)