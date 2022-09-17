import client from "../database/postgres";
import { testsByDisciplines } from "../services/testsService";
import { ITestsData } from "../types/testsType";

export async function lookingCategory(test: ITestsData){
    return await client.categories.findUnique({
        where: {
            id: Number(test.categoryId)
        }
    })
}
export async function lookingteachersDisciplines(test: ITestsData){
    return await client.teachersDisciplines.findUnique({
        where: {
            id: Number(test.teacherDisciplineId)
        }
    })
}

export async function insertTest(test: ITestsData){
    return await client.tests.create(
        {
            data: {
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: Number(test.categoryId),
            teacherDisciplineId: Number(test.teacherDisciplineId)    
        }
    }
    )
}

export async function findTestByDisciplines(){
    return await client.terms.findMany({
        select:{
            number: true,
            Disciplines:{
                select:{
                    name: true,
                    id: true,
                    TeachersDisciplines:{
                        select:{
                            Tests:{ distinct: ['categoryId'],
                                select:{
                                    category:{
                                        select: {id: true, 
                                                name: true,
                                                Tests: { 
                                                    select: { 
                                                        name: true,
                                                        
                                                        teacherDisciplines:{
                                                            select:{
                                                                teachers:{
                                                                    select:{name:true} }, disciplineId: true
                                                                }
                                                        }
                                                    }
                                                }}
                                    }
                                },
                                orderBy: [{category: {name: "desc"}}],
                            }
                        }
                    }
                }
            }
        }
    })
}


export async function findTestByTeachers() {
    return await client.teachers.findMany({
        select: {
            name: true,
            id: true,
            TeachersDisciplines: { distinct: ['teacherId'],
                select: {
                    Tests: { distinct: ['categoryId'],
                        select: {
                            category: { 
                                select: { 
                                    id: true,
                                    name: true,
                                    Tests: { 
                                        select: {
                                            name: true,
                                            teacherDisciplines: {
                                                select: {
                                                    discipline: {select: {name: true}},
                                                teachers: {select: {name: true}}
                                                }
                                            }
                                        }
                                    } 
                                }
                            }
                            
                        }, orderBy: [{category: {name: "desc"}}],
                    }
                }, orderBy: [{Tests: {_count: 'desc'}}]
            }
        }
    })
}
