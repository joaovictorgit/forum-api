import routes from "./routes/routes";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
