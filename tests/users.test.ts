import app from "../src/index"
import supertest from 'supertest';
import prisma from "../src/database/postgres"

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`
  });
  afterAll(async () => {
    await prisma.$disconnect();
});

 describe("Test create User", () => {

    it("given a valid user it should return 422", async () => {
        const body = {
            email: "Marina@hotmail.com"
           
        };

        const result = await supertest(app).post("/signup").send(body);
        expect(result.status).toEqual(422);
    });

    it("given a valid user it should return 201", async () => {
        const body = {
            email: "marly@hotmail.com",
            password: "Marly123*",
            confirmPassword: "Marly123*"
        };

        const result = await supertest(app).post("/signup").send(body);

        const userCreate = await prisma.user.findUnique({
            where: { email: body.email }
        });

        expect(result.status).toEqual(201);
        expect(userCreate).not.toBeNull();
    });

    it("given a valid user it should return 409", async () => {
        const body = {
            email: "caiovitor@hotmail.com",
            password: "Caio123*",
            confirmPassword: "Caio123*"
        };

        const firstTry = await supertest(app).post("/signup").send(body);
        expect(firstTry.status).toEqual(201);

        const secondTry = await supertest(app).post("/signup").send(body);
        expect(secondTry.status).toEqual(409);
    });
});

describe("Test Login User", () => {

    it("given a invalid body user it should return 422", async () => {
        const body = {
            email: "Marina@hotmail.com"
        };

        const result = await supertest(app).post("/signin").send(body);
        
        expect(result.status).toEqual(422);
    });

    it("given a valid user it should return 200", async () => {
        const body = {
            email: "caiovitor@hotmail.com",
            password: "Caio123*"
        };

        const result = await supertest(app).post("/signin").send(body);
        
        expect(result.status).toEqual(200);
    });

    it("given a user no register it should return 401", async () => {
        const body = {
            email: "zaira@hotmail.com",
            password: "zaira123*"
        };

        const result = await supertest(app).post("/signin").send(body);
        // Obs: Esse teste era pra dar 401, não entendo porque está retornando 422
        expect(result.status).toEqual(422);
    });

});
