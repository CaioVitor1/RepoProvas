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
                    TeachersDisciplines:{
                        select:{
                            Tests:{
                                select:{
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    teacherDisciplines:{
                                        select:{teachers:{select:{name:true}}},
                                    },
                                    category:{
                                        select: {name: true}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}
