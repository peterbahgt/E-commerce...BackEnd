import mongoose, { Schema, Types, model } from "mongoose";

const couponSchema = new Schema({

    name: {
        type: String,
        required: [true , 'name is required'],
        trim: true,
        lowercase:true
    },
    amount:{
        type:Number,
        required: [true , 'amount is required']
    },
    image: {
        type: Object
    },
    createdBy: {
        type: Types.ObjectId,
        required: [true, 'createdBy is required'],
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    expireIn:{
        type:Date,
        required:true
    },
    usedBy:[
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    timestamps: true
})

const couponModel = model('Coupon', couponSchema)

export default couponModel