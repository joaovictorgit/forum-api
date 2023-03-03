import userRouter from "./user-router";
import categoryRoute from "./category-router";

const routerExpress = require("express");
const routers = routerExpress.Router();

routers.use("/users", userRouter);
routers.use("/categories", categoryRoute);

export default routers;
