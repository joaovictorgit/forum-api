import routes from "./routes/routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 5000;
const HOST = process.env.HOST;

const swaggerOptions: any = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Forum Api",
      version: "1.0.0",
      description: 'Documentação para utilização da API "Forum Api".',
    },
    host: `http://localhost:${PORT}`,
    basepath: "/",
    tags: [
      {
        name: "Usuários",
        description: "Tudo sobre nossos usuários",
      },
      {
        name: "Categorias",
        description: "Tudo sobre as categorias",
      },
      {
        name: "Comentários",
        description: "Tudo sobre os comentários realizados no site",
      },
    ],
    schemes: -"http",
  },
  apis: ["./src/**/*-router.ts"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
