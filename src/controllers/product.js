import { productModel } from "../models/product.js";

const getProducts = async (req, res) => {
	try {
		const { name } = req.query;
		const query = {};

		if (name) {
			query.name = new RegExp(name, "i");
		}

		const products = await productModel.find(query);

		if (products.length === 0) {
			return res.status(404).json({ error: "No products found" });
		}

		const uniqueCategories = [
			...new Set(products.map((product) => product.category)),
		];

		const suggestedProducts = [];

		for (const category of uniqueCategories) {
			const categoryProducts = await productModel
				.find({
					category,
					name: { $nin: products.map((product) => product.name) },
				})
				.limit(2);

			suggestedProducts.push(...categoryProducts);
		}

		res.status(200).json({ products, suggestedProducts });
	} catch (error) {
		// Por mejorar: No se debe devolver el error en mensaje porque
		// Esto lo podría leer un cliente o usuario.
		// El error.message se debe cambiar antes de enviarse a producción
		res.status(500).json({ error: error.message });
	}
};

// Controlador para crear productos
const createProduct = async (req, res) => {
	try {
		const { name, category } = req.body;

		const product = { name, category };

		const newProduct = await productModel.create(product);

		return res.status(200).json({
			status: "Success",
			newProduct,
		});
	} catch (error) {
		return res.status(400).json({
			status: "Error",
			mensaje: "Error al crear un producto",
			error: error,
		});
	}
};

// Agregar edit products
// Agregar un Login y un register
// JWT

export default {
	getProducts,
	createProduct,
};
