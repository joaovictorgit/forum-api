import { Request, Response } from "express";
import { checkIfCategoryExist } from "../middleware/category-exist";
import { IComment } from "../entities/comment";
import { prisma } from "../service/prisma";
import { checkIfUserExist } from "../middleware/user-exist";
import { checkIfCommentExists } from "../middleware/comment-exist";

class CommentController {
  async createComment(request: Request, response: Response): Promise<Response> {
    try {
      const { text_comment, userId, categoryId } = request.body;
      const comment: IComment = {
        text_comment,
        userId,
        categoryId,
      };
      const category = await checkIfCategoryExist(categoryId);
      if (!category) {
        return response.status(400).json({
          message: "The category does not exist!",
          result: {},
        });
      }
      const new_comment = await prisma.comments.create({
        data: comment,
      });
      return response.status(201).json({
        message: "Comment created successfully!",
        result: new_comment,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showAllComments(response: Response): Promise<Response> {
    try {
      const comments = await prisma.comments.findMany();
      return response.status(200).json({
        message: "Registered commets",
        results: comments,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showCommentByCategoryId(
    id_category: number,
    response: Response
  ): Promise<Response> {
    try {
      if (!checkIfCategoryExist(id_category)) {
        return response.status(400).json({
          message: "The category does not exist!",
          result: {},
        });
      }
      const comments = await prisma.comments.findMany({
        where: {
          categoryId: id_category,
        },
      });
      return response.status(200).json({
        message: "Categories returned successfully!",
        results: comments,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async showCommentByUserId(
    user_id: number,
    response: Response
  ): Promise<Response> {
    try {
      if (!checkIfUserExist(user_id)) {
        return response.status(400).json({
          message: "The user does not exist!",
          result: {},
        });
      }
      const comments = await prisma.comments.findMany({
        where: {
          userId: user_id,
        },
      });
      return response.status(200).json({
        message: "Users returned successfully!",
        results: comments,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async updateComment(
    id_comment: number,
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const requestComment = request.body;
      if (!checkIfCommentExists(id_comment)) {
        return response.status(400).json({
          message: "The comment does not exist!",
          result: {},
        });
      }
      const updateComment = await prisma.comments.update({
        where: {
          id_comment: id_comment,
        },
        data: requestComment,
      });

      return response.status(200).json({
        message: "Comment successfully updated!",
        result: updateComment,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async deleteComment(
    id_comment: number,
    response: Response
  ): Promise<Response> {
    try {
      if (!checkIfCommentExists(id_comment)) {
        return response.status(400).json({
          message: "The comment does not exist!",
          result: {},
        });
      }
      const deleteComment = await prisma.comments.delete({
        where: {
          id_comment: id_comment,
        },
      });

      return response.status(200).json({
        message: "Comment successfully deleted!",
        result: deleteComment,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }
}

export default CommentController;
