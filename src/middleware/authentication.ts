import { User } from "@prisma/client";
import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
const secret_key: Secret = "login-user";

function authentication(request: any, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(400).json("Não tem token");
  }
  const token = authHeader.replace("Bearer", "").trim();
  jwt.verify(token, secret_key, (err: unknown, decoded: User) => {
    if (err) {
      return response.status(400).json("Token inválido ou expirado");
    }
    request.userId = decoded.id_user;
    return next();
  });
}

export default authentication;
