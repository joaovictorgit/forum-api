import routes from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocumment from "../swagger.json";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 5000;
const HOST = process.env.HOST;

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumment));
app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
