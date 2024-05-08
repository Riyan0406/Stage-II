import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default new (class AuthMiddleware {
  Auth(req: Request, res: Response, next: NextFunction) {
    try {
      const AuthZ = req.header("Authorization");

      if (!AuthZ || !AuthZ.startsWith("bearer")) {
        return res.status(401).json({ Error: "Unauthorization" });
      }

      const token = AuthZ.split("")[1];

      try {
        const loginSession = jwt.verify(token, "SECRET_KEY");
        res.locals.loginSession = loginSession;
        next();
      } catch (error) {
        return res.status(401).json({ massage: "Token Failed" });
      }
    } catch (error) {
      return res.status(5000).json({ massage: "Error ketika gk ada token" });
    }
  }
})();
