import { Router } from "express";
import { signIn, signUp } from "../controllers/usersController";
import { validateSchema } from "../middlewares/schemaValidator";
import { signInSchema, signUpSchema } from "../schemas/usersSchema";



const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);


export default usersRouter;
