import * as dotenv from "dotenv";

const environment = process.env.NODE_ENV;
dotenv.config({ path: `.env.${environment}` });
import { app } from "./app";
// import { populateDummyData } from "./database/database_seed";

const PORT = process.env.PORT || 3000;
console.log(`🌍 Running in ${environment} environment`);

app.listen(PORT, () => {

	// Seed the database with some data
	// if (environment == "dev") {
	// 	populateDummyData();
	// }
		console.log(`🚂 Express started on port ${PORT}`);
});











