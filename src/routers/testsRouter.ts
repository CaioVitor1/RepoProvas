import { Router } from "express";
import { createTest, testsSeparetedByDisciplines } from "../controllers/testsController";
import { validateSchema } from "../middlewares/schemaValidator";
import { validateToken } from "../middlewares/validateToken";
import { newTestSchema } from "../schemas/testsSchema";


const testsRouter = Router(); 

testsRouter.post("/tests/create", validateToken, validateSchema(newTestSchema), createTest);
testsRouter.get("/tests/disciplines", validateToken, testsSeparetedByDisciplines);


export default testsRouter;
