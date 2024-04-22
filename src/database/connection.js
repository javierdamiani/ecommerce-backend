import mongoose from "mongoose";
import config from "../config/config.js";

const connection = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${config.mongoUser}@cluster0.o0n7p3d.mongodb.net/ecommerce-backend`
		);
		console.log("Conectado correctamente a la base de datos");
	} catch (error) {
		console.log(error);
		throw new Error("No se ha podido conectar a la base de datos");
	}
};

export default connection;
