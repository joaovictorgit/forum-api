import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../entities/user";
import { checkIfUserExist } from "../middleware/user-exist";
import { prisma } from "../service/prisma";
const secret_key: Secret = "login-user";

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

  async loginUser(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const checkUser = await prisma.user.findUnique({ where: { email } });
      const hashPass = await bcrypt.compare(password, checkUser.password);
      if (!checkUser) {
        return response.status(400).json({
          message: "Email does not exist!",
        });
      }
      if (!hashPass) {
        return response.status(400).json({
          message: "Incorrect password!",
        });
      }
      return response.status(200).json({
        message: "Login successful!",
        result: checkUser,
        token: jwt.sign(
          {
            id: checkUser.id_user,
          },
          secret_key,
          { expiresIn: "1h" }
        ),
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
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

  async showUserById(user_id: number, response: Response): Promise<Response> {
    try {
      const check = await checkIfUserExist(user_id);
      if (!check) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }
      const user = await prisma.user.findUnique({
        where: { id_user: user_id },
      });
      return response.status(200).json({
        message: "User returned successfully!",
        result: user,
      });
    } catch (error: unknown) {
      return response.status(400).json({
        message: "Error!",
        error: error,
      });
    }
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = parseInt(request.params.id);
      const userRequest = request.body;

      let userExist = await checkIfUserExist(user_id);
      if (!userExist) {
        return response.status(400).json({
          message: "Error: user not found!",
          result: {},
        });
      }

      const updateUser = await prisma.user.update({
        where: {
          id_user: user_id,
        },
        data: userRequest,
      });
      return response.status(200).json({
        message: "User data successfully updated!",
        result: updateUser,
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
      let userExist = await checkIfUserExist(user_id);
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
