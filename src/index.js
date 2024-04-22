// Importar express
import express from "express";
// Importar la conexión a la BD
import connection from "./database/connection.js";
// Importar CORS
import cors from "cors";
// importar ruta del producto
import route_product from "./routes/product.js";

// Conexión a la BD
connection();

// Express instance
const app = express();

// Utilizar cors
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
	res.send("Hola mundo!");
});
//Ruta
app.use("/api/products", route_product);

// Iniciar el servidor en el puerto 3000

app.listen(3000, () => {
	console.log("Servidor iniciado en el puerto 3000");
});
