import { ITestsData } from "../types/testsType";
import { Request, Response } from "express";
import * as testsService from "../services/testsService"

export async function createTest(req: Request, res: Response){
    const test: ITestsData = req.body
    await testsService.creatingTest(test)
    return res.status(201).send("Test create with successful")
}

export async function testsSeparetedByDisciplines(req: Request, res: Response){
    const tests = await testsService.testsByDisciplines()
    return res.status(200).send(tests)
}

//export async testsSeparetedByDisciplines(req: Request, res: Response)