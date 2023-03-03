import { Request, Response } from "express";
import { prisma } from "../service/prisma";
import { ICategory } from "../entities/category";
import { checkIfCategoryExist } from "../middleware/category-exist";

class CategoryController {
  async createCategory(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { name_category } = request.body;
      const category: ICategory = { name_category };
      const new_category = await prisma.category.create({
        data: category,
      });
      return response.status(201).json({
        message: "Category created successfully!",
        result: new_category,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error creating category!",
        error: error,
      });
    }
  }

  async showAllCategories(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const categories = await prisma.category.findMany();
      return response.status(200).json({
        message: "Registered categories",
        results: categories,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error creating category!",
        error: error,
      });
    }
  }

  async findCategoryByName(
    name_category: string,
    response: Response
  ): Promise<Response> {
    try {
      const category = await prisma.category.findUnique({
        where: {
          name_category: name_category,
        },
      });

      if (!category) {
        return response.status(400).json({
          message: "Category does not exist!",
          result: false,
        });
      }
      return response.status(200).json({
        message: `Category: ${category.name_category}!`,
        result: true,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error find category!",
        error: error,
      });
    }
  }

  async updateCategory(
    id: number,
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const requestCategory = request.body;
      const category = await prisma.category.findUnique({
        where: {
          id_category: id,
        },
      });
      if (!category) {
        return response.status(400).json({
          message: "Category does not exist!",
          result: false,
        });
      }

      const update_category = await prisma.category.update({
        where: {
          id_category: id,
        },
        data: requestCategory,
      });

      return response.status(200).json({
        message: "Category name successfully updated!",
        result: update_category,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error find category!",
        error: error,
      });
    }
  }
}

export default CategoryController;
