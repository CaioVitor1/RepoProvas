import { ITestsData } from "../types/testsType";
import * as testRepository from "../repositories/testsRepository"

export async function creatingTest(test: ITestsData){
//Roles of business: verify if category is register
const category = await testRepository.lookingCategory(test)
if(category === null) {
    throw { code: "notFound", message: "this category is not register" };
}
//Roles of business: verify if relation teachersDisciplines ixist
const teachersDisciplines = await testRepository.lookingteachersDisciplines(test)
if(teachersDisciplines === null) {
    throw { code: "notFound", message: "this relation is not register" };
}
await testRepository.insertTest(test)
}

export async function testsByDisciplines(){
    const test = await testRepository.findTestByDisciplines()
    return test
}