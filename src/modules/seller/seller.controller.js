import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "express-async-handler";
import sellerService from "./seller.service.js";
import PDFDocument from "pdfkit"

export const sellerLogin = asyncHandler(async (req, res) => {
    const sellerInfoObj = req.body;

    const login = await sellerService.sellerToken(sellerInfoObj);

    return res
    .status(200)
    .json(new ApiResponse(200, "Access Token Created for Seller", login));
})

export const addProduct = asyncHandler(async (req, res) => {
    const productInfoObj = req.body;
    const sellerId = req.user.id;

    const product = await sellerService.addProductEntry(productInfoObj, sellerId);

    return res
    .status(201)
    .json(new ApiResponse(201, "Product added successfully", product));
})


export const getProducts = asyncHandler(async (req, res) => {
    const sellerId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await sellerService.getProductsForSeller(page, limit, sellerId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Products Fetched for the Seller", products));
})


export const generateProductPDF = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const sellerId = req.user.id;

    const {product, totalPrice} = await sellerService.getSpecificProductEntry(productId, sellerId);

    const doc = new PDFDocument();

    // Set Headers for Browser Download/View
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${product.productName}.pdf`);

    //  Pipe PDF to Response
    doc.pipe(res);

    // --- PDF DESIGN ---
    doc.fontSize(25).text('Product Report', { align: 'center', underline: true });
    doc.moveDown();

    doc.fontSize(18).text(`Product: ${product.productName}`);
    doc.fontSize(12).text(`Description: ${product.productDescription}`);
    doc.moveDown();
    
    doc.text('--------------------------------------------------');
    doc.fontSize(16).text('Brand Details:', { underline: true });
    doc.moveDown(0.5);

    // Loop through each brand
    product.brands.forEach((brand, index) => {
        doc.fontSize(14).text(`${index + 1}. ${brand.brandName}`);
        doc.fontSize(10).text(`   Details: ${brand.detail}`);
        doc.text(`   Price: $${brand.price}`); // Using $ as requested
        // Note: For Brand Image, you'd usually draw it with doc.image(path) 
        // if you have a local path or buffer.
        doc.moveDown(0.5);
    });

    doc.text('--------------------------------------------------');
    doc.moveDown();
    doc.fontSize(18).fillColor('green').text(`Total Price: $${totalPrice}`, { align: 'right' });

    // 5. Finalize PDF
    doc.end();
})


export const deleteSpecificProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const sellerId = req.user.id;

    const product = await sellerService.deleteProductEntry(productId, sellerId);

    return res
    .status(200)
    .json(new ApiResponse(200, "Product Deleted Successfully", product));
})

