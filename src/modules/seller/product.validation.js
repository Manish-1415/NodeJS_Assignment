import Joi from "joi";

export const addProductSchema = Joi.object({
    productName: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),
    
    productDescription: Joi.string()
        .min(10)
        .max(1000)
        .required(),

    // Validating the array of brand objects
    brands: Joi.array().items(
        Joi.object({
            brandName: Joi.string()
                .trim()
                .required(),
            
            detail: Joi.string()
                .required(),
            
            image: Joi.string()
                .uri() // Ensures it's a valid URL format
                .required(),
            
            price: Joi.number()
                .precision(2) // Allows for cents/paise (e.g., 99.99)
                .positive()
                .required()
        })
    )
    .min(1) // Requirement: At least one brand must exist
    .required()
});