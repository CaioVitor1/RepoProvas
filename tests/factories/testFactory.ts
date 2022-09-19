import {faker} from "@faker-js/faker"
import app from "../../src/index"
import supertest from 'supertest';
import * as userFactory from "./userFactory"

export async function createBodyTest(){
    return {
        name: faker.lorem.word(8)  ,
        pdfUrl: faker.internet.url(), 
        categoryId: 2, 
        teacherDisciplineId: 2
    };

}

export async function createInvalidCategory(){
    return {
        name: faker.lorem.word(8)  ,
        pdfUrl: faker.internet.url(), 
        categoryId: 20, 
        teacherDisciplineId: 2
    };

}

export async function createInvalidTeacherDisc(){
    return {
        name: faker.lorem.word(8)  ,
        pdfUrl: faker.internet.url(), 
        categoryId: 2, 
        teacherDisciplineId: 20
    };
}

export async function makeLogin(){
    const user = await userFactory.createBodyUser()
        
        const createUser = await supertest(app).post("/signup").send(user);

        expect(createUser.status).toEqual(201);

        const login = await supertest(app).post("/signin").send({
            email: user.email,
            password: user.password
        });
        const token  = login.text;
        return token
}

export async function invalidToken(){
    return "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2NjMyNjkyMjUsImV4cCI6MTY2NTg2MTIyNX0.dC5lAWXiCpJpFbWOoHRvQlNKKIZ80-_PrHbpZjf3IeE"      
    
}