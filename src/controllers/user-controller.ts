import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../entities/user";
const prisma = new PrismaClient();

class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { name_user, email, password } = request.body;
      const newPass = await bcrypt.hash(password, 8);
      const user: IUser = {
        name_user,
        email,
        password: newPass,
      };

      const new_user = await prisma.user.create({
        data: user,
      });

      return response.status(200).json({
        message: "User created successfully!",
        result: new_user,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error creating user!",
        error: error,
      });
    }
  }

  async showAllUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany();
      return response.status(200).json({
        message: "Registered users",
        results: users,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async deleteUser(user_id: number, response: Response): Promise<Response> {
    try {
      let userExist = true;
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }

      const delUser = await prisma.user.delete({
        where: { id_user: user_id },
      });
      return response.status(200).json({
        message: "User deleted successfully!",
        result: delUser,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error: user not found!",
        error: error,
      });
    }
  }
}

export default UserController;
