import * as dotenv from "dotenv";
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });
import { app } from "./app";
import { populateDummyData } from "./database/database_seed";
const PORT = process.env.PORT;

console.log(`🌍 Running in ${environment} environment`);
console.log(`🚂 Express started on port ${PORT}`);
app.listen(PORT, () => {


	// Seed the database with some data
	if (environment === "dev") {
		populateDummyData();
	}
});
