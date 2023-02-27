import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController();
const userExpress = require("express");
const userRoute = userExpress.Router();

userRoute.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.createUser(request, response);
  }
);

userRoute.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.showAllUsers(request, response);
  }
);

userRoute.delete(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.deleteUser(id, response);
  }
);

export default userRoute;
