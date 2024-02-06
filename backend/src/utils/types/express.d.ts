import { CreateUser } from "../../services/controller/UserController/createUser";

declare namespace Express {
  export interface Request {
    userId: string;
    
  }
}declare module 'express-serve-static-core' {
  interface Request {
    user?: CreateUser | null;
  }
}

