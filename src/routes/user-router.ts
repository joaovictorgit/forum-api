import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";
import authentication from "../middleware/authentication";
import express from "express";

const userController = new UserController();
const userRoute = express.Router();

userRoute.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.createUser(request, response);
  }
);

userRoute.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.loginUser(request, response);
  }
);

userRoute.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.showAllUsers(request, response);
  }
);

userRoute.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.showUserById(id, response);
  }
);

userRoute.patch(
  "/:id",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    return userController.updateUser(request, response);
  }
);

userRoute.delete(
  "/:id",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.deleteUser(id, response);
  }
);

export default userRoute;
