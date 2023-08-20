import express from "express";
import { router } from "./routes/routes";

export const app = express();


app.get("/",(req, res)=> {
	res.send('Welcome to Minimalist Book Manager')
} );

app.use(express.json());
app.use("/api/v1", router);

