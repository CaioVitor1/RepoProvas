import app from "../src/index"
import supertest from 'supertest';

 describe("Test create User", () => {

    it("given a valid user it should return 422", async () => {
        const body = {
            email: "Marina@hotmail.com"
           
        };

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    });

    it("given a valid user it should return 201", async () => {
        const body = {
            email: "marly@hotmail.com",
            password: "Marly123*",
            confirmPassword: "Marly123*"
        };

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });

    it("given a valid user it should return 209", async () => {
        const body = {
            email: "caiovitor@hotmail.com",
            password: "Caio123*",
            confirmPassword: "Caio123*"
        };

        const result = await supertest(app).post("/signup").send(body);
        const status = result.status;
        
        expect(status).toEqual(409);
    });
});

describe("Test Login User", () => {

    it("given a invalid body user it should return 422", async () => {
        const body = {
            email: "Marina@hotmail.com"
        };

        const result = await supertest(app).post("/signin").send(body);
        const status = result.status;
        
        expect(status).toEqual(422);
    });

    it("given a valid user it should return 200", async () => {
        const body = {
            email: "caiovitor@hotmail.com",
            password: "Caio123*"
        };

        const result = await supertest(app).post("/signin").send(body);
        const status = result.status;
        
        expect(status).toEqual(200);
    });

    it("given a user no register it should return 401", async () => {
        const body = {
            email: "zaira@hotmail.com",
            password: "zaira123*"
        };

        const result = await supertest(app).post("/signin").send(body);
        const status = result.status;
        
        expect(status).toEqual(401);
    });

});
