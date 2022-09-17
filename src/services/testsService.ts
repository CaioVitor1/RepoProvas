import { ITestsData } from "../types/testsType";
import * as testRepository from "../repositories/testsRepository"
import { Tests } from "@prisma/client";

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
   
    const testsByDisciplines = await testRepository.findTestByDisciplines()

    const buildTestByDisciplines = testsByDisciplines.map((item) => {
        return{
            periodo: item.number,
            disciplina: item.Disciplines.map((disciplines) =>{
                return{
                    discipline: disciplines.name,
                    categorias: disciplines.TeachersDisciplines[0].Tests.map((categories)=>{
                        return{
                            categoryName: categories.category.name,
                            
                            testsInfos: categories.category.Tests.map((tests)=>{
                                if(disciplines.id === tests.teacherDisciplines.disciplineId){

                                    return{
                                        name: tests.name,
                                        teacherName: tests.teacherDisciplines.teachers.name
                                    }
                                 } 
                            }).filter((testElement)=> testElement )
                        }
                    })
                }
            })
        }
    }) 
    
    
    return buildTestByDisciplines
}

export async function testsByTeachers(){
    const getTestByTeacher = await testRepository.findTestByTeachers()

    const buildTestByTeacher = getTestByTeacher.map((item) =>{
        return{
            teacherName: item.name,
            teacherId: item.id,
            infos: item.TeachersDisciplines[0].Tests.map((infos)=>{
                return{
                    categoryName: infos.category.name,
                    infosTests: infos.category.Tests.map((tests)=>{
                        if(tests.teacherDisciplines.teachers.name === item.name){
                            return{
                                testName: tests.name,
                                disciplineName: tests.teacherDisciplines.discipline.name,
                                teacher: tests.teacherDisciplines.teachers.name
                            }
                        }
                        
                    }).filter((element)=> element)
                }
                
            })
        }
    })
    return buildTestByTeacher
} 

