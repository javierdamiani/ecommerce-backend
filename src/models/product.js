import mongoose from "mongoose";

const ProductCollection = "products";

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

export const productModel = mongoose.model(ProductCollection, ProductSchema);
