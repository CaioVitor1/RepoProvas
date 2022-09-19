import app from "../src/index"
import supertest from 'supertest';
import prisma from "../src/database/postgres"
import * as userFactory from "./factories/userFactory"
beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`
  });
  afterAll(async () => {
    await prisma.$disconnect();
});

 describe("Test create User", () => {

    it("given a invalid body it should return 422", async () => {
        const body = {
            email: "zzzzzz@hotmail.com"    
        };

        const result = await supertest(app).post("/signup").send(body);
        expect(result.status).toEqual(422);
    });

    it("given a invalid password it should return 422", async () => {
        const body = userFactory.passwordIncorret()

        const result = await supertest(app).post("/signup").send(body);
        expect(result.status).toEqual(422);
    });

    it("given a valid user it should return 201", async () => {
       const body = await userFactory.createBodyUser()

       const result = await supertest(app).post("/signup").send(body);
        
       const findUser = await prisma.user.findUnique({
            where: { email: body.email }
        });

        expect(result.status).toEqual(201);
        expect(findUser).not.toBeNull();
    });

    it("given a user already register it should return 409", async () => {
        const body = await userFactory.createBodyUser()

        const firstTry = await supertest(app).post("/signup").send(body);
        expect(firstTry.status).toEqual(201);

        const secondTry = await supertest(app).post("/signup").send(body);
        expect(secondTry.status).toEqual(409);
    });
});


/////////////////////////////////////////////////////////////////

describe("Test Login User", () => {

    it("given a invalid body user it should return 422", async () => {
        const body = await userFactory.createBodyUser()

        const result = await supertest(app).post("/signin").send({
            email: body.email
        });
        
        expect(result.status).toEqual(422);
    });

    it("given a valid user it should return 200", async () => {
        const user = await userFactory.createBodyUser()
        
        const createUser = await supertest(app).post("/signup").send(user);

        expect(createUser.status).toEqual(201);

    
        const result = await supertest(app).post("/signin").send({
            email: user.email,
            password: user.password
        });
        
        expect(result.status).toEqual(200);
    });

    it("given a user no register it should return 401", async () => {
        const body = await userFactory.createBodyUser()

        const result = await supertest(app).post("/signin").send({
            email: body.email,
            password: body.password
        });
        expect(result.status).toEqual(401);
    });

});
