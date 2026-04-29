import ApiError from "../utility/ApiError.js";

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { 
            abortEarly: false, // Include all errors, not just the first one
            allowUnknown: true // Allows other fields to pass through if necessary
        });

        if (error) {
            // Extract the error messages and send a 400 Bad Request
            const errorMessages = error.details.map(detail => detail.message);
            next(new ApiError(400, errorMessages));
        }

        next(); // Data is valid, move to the controller
    };
};

export default validateRequest;