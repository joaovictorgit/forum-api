import userRouter from "./user-router";
import categoryRoute from "./category-router";
import commentRoute from "./comment-router";
import express from "express";

const routers = express.Router();

routers.use("/users", userRouter);
routers.use("/categories", categoryRoute);
routers.use("/comments", commentRoute);

export default routers;
