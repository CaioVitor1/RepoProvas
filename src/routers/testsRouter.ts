import { Router } from "express";
import { createTest, testsSeparetedByDisciplines, testsSeparetedByTeacher } from "../controllers/testsController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { newTestSchema } from "../schemas/testsSchema";


const testsRouter = Router(); 

testsRouter.post("/tests/create", validateToken, validateSchema(newTestSchema), createTest);
testsRouter.get("/tests/disciplines", validateToken, testsSeparetedByDisciplines);
testsRouter.get("/tests/teachers", validateToken, testsSeparetedByTeacher);

export default testsRouter;
