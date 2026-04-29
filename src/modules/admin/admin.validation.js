import Joi from "joi";

const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export default adminLoginSchema;



// src/validations/adminValidation.js
export const sellerCreationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNo: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    skills: Joi.array().items(Joi.string()).min(1).required(), // Must select multiple 
    password: Joi.string().min(6).required()
});