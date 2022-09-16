import { Router } from "express";
import testsRouter from "./testsRouter";
import usersRouter from "./usersRouter";

const router = Router();
router.use(usersRouter)
router.use(testsRouter)
export default router;