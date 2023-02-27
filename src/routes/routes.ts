import userRouter from "./user-router";

const routerExpress = require("express");

const routers = routerExpress.Router();

routers.use("/users", userRouter);

export default routers;
