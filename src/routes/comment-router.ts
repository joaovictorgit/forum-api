import express, { Request, Response } from "express";
import CommentController from "../controllers/comment-controller";

const commentRoute = express.Router();
const commentController = new CommentController();

commentRoute.post("/", (request: Request, response: Response) => {
  return commentController.createComment(request, response);
});

commentRoute.get("/", (request: Request, response: Response) => {
  return commentController.showAllComments(response);
});

commentRoute.get("/categories/:id", (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  return commentController.showCommentByCategoryId(id, response);
});

commentRoute.get("/users/:id", (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  return commentController.showCommentByUserId(id, response);
});

commentRoute.patch("/:id", (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  return commentController.updateComment(id, request, response);
});

commentRoute.delete("/:id", (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  return commentController.deleteComment(id, response);
});

export default commentRoute;
