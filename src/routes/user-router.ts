import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user-controller";
import authentication from "../middleware/authentication";
const userController = new UserController();
const userExpress = require("express");
const userRoute = userExpress.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *     - Usuários
 *     summary: Cadastra um novo usuário
 *     description: ""
 *     parameters:
 *     - in: body
 *       name: body
 *       description: O "objeto usuário" a ser adicionado ao banco de dados
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *         - id_user
 *         - name_user
 *         - password
 *         properties:
 *           id_user:
 *             type: serial
 *             description: ID serial gerado automaticamente pelo banco de dados
 *           name_user:
 *             type: string
 *             description: Email do usuário
 *           email:
 *             type: string
 *             description: Email do usuário
 *           password:
 *             type: string
 *             description: Senha do usuário
 *         responses:
 *           200:
 *             description: Usuário cadastrado com sucesso
 *           400:
 *             description: Bad Request
 *           500:
 *             description: Internal Server Error
 */

userRoute.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.createUser(request, response);
  }
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *     - Usuários
 *     summary: Faz o login do usuário
 *     description: ""
 *     parameters:
 *     - in: body
 *       name: body
 *       description: Faz o login do usuário e gera um token
 *       required: true
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - senha
 *         properties:
 *           email:
 *             type: string
 *             description: Email do usuário cadastrado no banco de dados
 *           senha:
 *             type: string
 *             description: Senha do usuário cadastrado no banco de dados
 *         responses:
 *           200:
 *             description: OK
 *           400:
 *             description: Informações Inválidas
 *           500:
 *             description: Internal Server Error
 */

userRoute.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.loginUser(request, response);
  }
);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *     - Usuários
 *     summary: Mostra todos os usuários cadastrados
 *     description: ""
 *     parameters: ""
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
userRoute.get(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    return userController.showAllUsers(request, response);
  }
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *     - Usuários
 *     summary: Mostra um usuário especificado pelo seu id
 *     description: ""
 *     parameters:
 *     - name: id_usuario
 *       in: path
 *       required: true
 *       description: O id do usuário a ser pesquisado
 *       type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Internal Server Error
 */
userRoute.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.showUserById(id, response);
  }
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags:
 *     - Usuários
 *     summary: Altera um usuário especificado pelo seu id
 *     description: ""
 *     parameters:
 *     - name: id_user
 *       in: path
 *       required: true
 *       description: O id do usuário a ser atualizado
 *       type: integer
 *     - body: body
 *       in: body
 *       required: true
 *       description: O json contendo os campos e valores a serem atualizados
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Internal Server Error
 */

userRoute.patch(
  "/:id",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    return userController.updateUser(request, response);
  }
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *     - Usuários
 *     summary: Deleta um usuário especificado pelo seu id
 *     description: ""
 *     parameters:
 *     - name: id_user
 *       in: path
 *       required: true
 *       description: O id do usuário a ser deletado
 *       type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Internal Server Error
 */

userRoute.delete(
  "/:id",
  authentication,
  (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);
    return userController.deleteUser(id, response);
  }
);

export default userRoute;
