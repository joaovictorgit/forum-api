import { NextFunction, Request, Response } from "express";
import CategoryController from "../controllers/category-controller";

const categoryExpress = require("express");
const categoryRoute = categoryExpress.Router();
const categoryController = new CategoryController();

categoryRoute.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return categoryController.createCategory(request, response);
  }
);

categoryRoute.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return categoryController.showAllCategories(request, response);
  }
);

categoryRoute.get(
  "/:name",
  (request: Request, response: Response, next: NextFunction) => {
    const name = request.params.name;
    return categoryController.findCategoryByName(name, response);
  }
);

categoryRoute.patch(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return categoryController.updateCategory(id, request, response);
  }
);

export default categoryRoute;
