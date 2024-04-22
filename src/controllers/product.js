import { productModel } from "../models/product.js";

const getProducts = async (req, res) => {
	try {
		// Desestrucutramos el req.query
		const { name, category } = req.query;
		// Creamos una variable query que es un objeto vacío para después
		// Poderle asignar los valores si es que los hubiera
		const query = {};

		// Si hay una propiedad name que se le asigne como valor a query
		if (name) {
			query.name = new RegExp(name, "i");
		}

		// Si hay una propiedad category que se le asigne como valor a query
		if (category) {
			query.category = new RegExp(category, "i");
		}

		// Se hace la búsqueda de productos pasándole la query como parámetro
		const products = await productModel.find(query);

		// Si no hay productos se responde un error 404 y "No products found"
		if (products.length === 0) {
			return res.status(404).json({ error: "No products found" });
		}

		// Se define la variable suggestedProducts en donde se hace la búsqueda teniendo
		// en cuenta la categoría del producto y que no nos devuelva el producto con el mismo
		// id que ya tenemos arriba en products, se establece límite 2
		const suggestedProducts = await productModel
			.find({
				category: products[0].category,
				_id: { $ne: products[0]._id },
			})
			.limit(2);

		// Si todo sale bien se devuelve un status 200 y los productos así como los suggestedProducts
		res.status(200).json({ products, suggestedProducts });
	} catch (error) {
		// De lo contrario se devuelve un status 500 con el error
		// Por mejorar: No se debe devolver el error en mensaje porque
		// Esto lo podría leer un cliente o usuario.
		// El error.message se debe cambiar antes de enviarse a producción
		res.status(500).json({ error: error.message });
	}
};

// Controlador para crear productos
const createProduct = async (req, res) => {
	try {
		// Desestrucutramos el body en name y category
		const { name, category } = req.body;

		// Seteamos al product con el name y category del req.body
		const product = { name, category };
		// creamos una nueva variable newProduct con el await y el modelo con el
		// método create en donde le pasamos como parámetro el product
		const newProduct = await productModel.create(product);

		//Si todo sale bien se devuelve un status 200 y el nuevo producto creado

		return res.status(200).json({
			status: "Success",
			newProduct,
		});
	} catch (error) {
		// Si hay un error se devuelve un status 400 y el mensaje de error
		return res.status(400).json({
			status: "Error",
			mensaje: "Error al crear un producto",
			error: error,
		});
	}
};

export default {
	getProducts,
	createProduct,
};
