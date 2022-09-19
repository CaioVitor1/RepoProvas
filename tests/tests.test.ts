import app from "../src/index"
import supertest from 'supertest';
import prisma from "../src/database/postgres"
import * as testFactory from "./factories/testFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE Tests;`
  });
  afterAll(async () => {
    await prisma.$disconnect();
});



describe("Test create new Tests", () => {

    it("given a invalid body it should return 422", async () => {
        const token = await testFactory.makeLogin()
        
        const body = await testFactory.createBodyTest()

        const result = await supertest(app).post("/tests/create")
        .set({Authorization: `Bearer ${token}`})
        .send({
            name: body.name
        })
        expect(result.status).toEqual(422);
    });
   
   
    it("given a invalid category should return 404", async () => {
        const token = await testFactory.makeLogin()

        const body = await testFactory.createInvalidCategory()

        const result = await supertest(app).post("/tests/create")
        .set({Authorization: `Bearer ${token}`})
        .send(body);
        expect(result.status).toEqual(404);
    });

    it("given a invalid relation should return 404", async () => {
        const token = await testFactory.makeLogin()
        const body = await testFactory.createInvalidTeacherDisc()

        const result = await supertest(app).post("/tests/create")
        .set({Authorization: `Bearer ${token}`})
        .send(body);
        expect(result.status).toEqual(404);
    });
    it("given a invalid token should return 401", async () => {
        const token = await testFactory.invalidToken()
        const body = await testFactory.createInvalidTeacherDisc()

        const result = await supertest(app).post("/tests/create")
        .set({Authorization: `Bearer ${token}`})
        .send(body);
        expect(result.status).toEqual(401);
    });
    
    it("given a requisiton without token should return 401", async () => {
        const token = await testFactory.makeLogin()
        const body = await testFactory.createInvalidTeacherDisc()

        const result = await supertest(app).post("/tests/create")
        .send(body);
        expect(result.status).toEqual(401);
    });
     
    it("given a valid requisition return 201", async () => {
        const token = await testFactory.makeLogin()
        const user = await testFactory.createBodyTest()

        const result = await supertest(app).post("/tests/create")
        .set({Authorization: `Bearer ${token}`})
        .send(user);
        expect(result.status).toEqual(201);
    });


});

describe("Test get tests by disciplines ", () => {

    it("given a invalid token it should return 401", async () => {
        const token = await testFactory.invalidToken()

        const result = await supertest(app).get("/tests/disciplines")
        .set({Authorization: `Bearer ${token}`})
        .send()
        expect(result.status).toEqual(401);
    });

    it("given without token it should return 401", async () => {
        const token = await testFactory.invalidToken()

        const result = await supertest(app).get("/tests/disciplines")
        .send()
        expect(result.status).toEqual(401);
    });

    it("given valid requisiton it should return 200", async () => {
        const token = await testFactory.makeLogin()

        const result = await supertest(app).get("/tests/disciplines")
        .set({Authorization: `Bearer ${token}`})
        .send()

        const countData = result.body.length;

        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array);
        expect(countData).toBeGreaterThan(0);
    });

});

describe("Test get tests by teachers ", () => {

    it("given a invalid token it should return 401", async () => {
        const token = await testFactory.invalidToken()

        const result = await supertest(app).get("/tests/teachers")
        .set({Authorization: `Bearer ${token}`})
        .send()
        expect(result.status).toEqual(401);
    });
    

    it("given without token it should return 401", async () => {
        const token = await testFactory.invalidToken()

        const result = await supertest(app).get("/tests/teachers")
        .send()
        expect(result.status).toEqual(401);
    });

    it("given valid requisiton it should return 200", async () => {
        const token = await testFactory.makeLogin()

        const result = await supertest(app).get("/tests/teachers")
        .set({Authorization: `Bearer ${token}`})
        .send()

        const countData = result.body.length;

        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array);
        expect(countData).toBeGreaterThan(0);
    });

});

