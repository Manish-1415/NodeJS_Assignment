import mongoose from "mongoose";

// Brand Schema as a sub-document
const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true, 
    },
    detail: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Store the URL or path to the image
        required: true, 
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, 
        trim: true
    },
    productDescription: {
        type: String,
        required: true 
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to your User model (the seller) 
        required: true
    },
    brands: [brandSchema] // Array to allow multiple brands for a single product [cite: 18, 24]
}, { 
    timestamps: true // Keeps track of when products are added/updated
});

export const Product = mongoose.model("Product", productSchema);