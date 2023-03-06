import { NextFunction, Request, Response } from "express";
import CategoryController from "../controllers/category-controller";
import express from "express";
import authentication from "../middleware/authentication";

const categoryRoute = express.Router();
const categoryController = new CategoryController();

categoryRoute.post(
  "/",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    return categoryController.createCategory(request, response);
  }
);

categoryRoute.get(
  "/",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    return categoryController.showAllCategories(request, response);
  }
);

categoryRoute.get(
  "/:name",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    const name = request.params.name;
    return categoryController.findCategoryByName(name, response);
  }
);

categoryRoute.patch(
  "/:id",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return categoryController.updateCategory(id, request, response);
  }
);

export default categoryRoute;
